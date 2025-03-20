
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";
import { fetchUserData } from "./auth-utils";

export const useAuthHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!user?.id) return;
    
    try {
      const userData = await fetchUserData(user.id);
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };

  // Initialize session and user data
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Get user data from localStorage or create minimal object
          const storedUser = localStorage.getItem("user");
          
          if (storedUser) {
            // Use stored data temporarily
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            
            // Update data in background
            const freshUserData = await fetchUserData(data.session.user.id);
            if (freshUserData) {
              setUser(freshUserData);
              localStorage.setItem("user", JSON.stringify(freshUserData));
            }
          } else if (data.session.user) {
            // Fetch complete user data
            const userData = await fetchUserData(data.session.user.id);
            
            if (userData) {
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
              // Create minimal object if data not found
              const { email, id } = data.session.user;
              const minimalUser = {
                id,
                name: email?.split("@")[0] || "Usuário",
                email: email || "",
              };
              localStorage.setItem("user", JSON.stringify(minimalUser));
              setUser(minimalUser);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao obter sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event);
        
        if (event === "SIGNED_IN" && session) {
          // When user logs in, update user state
          const userData = await fetchUserData(session.user.id);
          
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          } else {
            // Fallback if data not found
            const updatedUser = {
              id: session.user.id,
              name: session.user.email?.split("@")[0] || "Usuário",
              email: session.user.email || "",
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } else if (event === "SIGNED_OUT") {
          // When user logs out, clear user state
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    );

    getInitialSession();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Fetch complete user data
        const userData = await fetchUserData(data.user.id);
        
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } else {
          // Fallback to minimal user object
          const loggedInUser = {
            id: data.user.id,
            name: data.user.email?.split("@")[0] || "Usuário",
            email: data.user.email || "",
          };
          
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          setUser(loggedInUser);
        }
        
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

  // Signup function
  const signup = async (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => {
    setIsLoading(true);
    try {
      // Register user with Supabase Auth
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
        const trialEndDate = trialEndsAt.toISOString().split('T')[0]; // Format YYYY-MM-DD
        
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
            console.error("Erro ao criar assinatura:", subscriptionError);
          }
        }
        
        // Create user object with all data
        const newUser = {
          id: authData.user.id,
          name,
          email,
          plan: plan || "Teste",
          trialEndsAt: trialEndDate,
          paymentMethodId: paymentMethod
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

  // Logout function
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

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    refreshUserData,
  };
};
