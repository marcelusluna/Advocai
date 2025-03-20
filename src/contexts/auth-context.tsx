
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  name: string;
  email: string;
  plan?: string;
  trialEndsAt?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for Supabase session on mount
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Get user data from localStorage or create minimal object
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else if (data.session.user) {
            // Create minimal user object if we have auth but no stored user data
            const { email, id } = data.session.user;
            const minimalUser = {
              id,
              name: email?.split("@")[0] || "User",
              email: email || "",
            };
            localStorage.setItem("user", JSON.stringify(minimalUser));
            setUser(minimalUser);
          }
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          // When user signs in, update the user state
          const { user } = session;
          const updatedUser = {
            id: user.id,
            name: user.email?.split("@")[0] || "User",
            email: user.email || "",
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        } else if (event === "SIGNED_OUT") {
          // When user signs out, clear the user state
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    );

    getInitialSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Fetch user plan information if available
        const { data: planData, error: planError } = await supabase
          .from('assinaturas')
          .select('plano, data_fim')
          .eq('user_id', data.user.id)
          .maybeSingle();
        
        // Create user object with plan information if available
        const loggedInUser = {
          id: data.user.id,
          name: data.user.email?.split("@")[0] || "User",
          email: data.user.email || "",
          plan: planData?.plano || "Teste",
          trialEndsAt: planData?.data_fim,
        };
        
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao Advoc.AI!",
        });
        
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => {
    setIsLoading(true);
    try {
      // Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        // Calculate trial end date (14 days from now)
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 14);
        const trialEndDate = trialEndsAt.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        
        // Create subscription record in assinaturas table
        if (plan) {
          const { data: planData } = await supabase
            .from('planos')
            .select('preco')
            .eq('nome', plan)
            .maybeSingle();
          
          const preco = planData?.preco || 0;
          
          // Insert subscription record
          const { error: subscriptionError } = await supabase
            .from('assinaturas')
            .insert({
              user_id: authData.user.id,
              plano: plan,
              data_inicio: new Date().toISOString().split('T')[0],
              data_fim: trialEndDate,
              preco: preco,
              status: 'trial',
              stripe_payment_method_id: paymentMethod || null,
            });
          
          if (subscriptionError) {
            console.error("Error creating subscription:", subscriptionError);
          }
        }
        
        // Create user profile record
        const newUser = {
          id: authData.user.id,
          name,
          email,
          plan: plan || "Teste",
          trialEndsAt: trialEndDate,
        };
        
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        
        toast({
          title: "Conta criada com sucesso",
          description: "Bem-vindo ao Advoc.AI! Seu período de teste gratuito de 14 dias começou.",
        });
        
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      setUser(null);
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
