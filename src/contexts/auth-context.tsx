
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
  paymentMethodId?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Função para buscar dados do usuário do Supabase
  const fetchUserData = async (userId: string): Promise<User | null> => {
    try {
      // Buscar informações de assinatura do usuário
      const { data: userData, error: userError } = await supabase
        .from('assinaturas')
        .select('plano, data_fim, stripe_payment_method_id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (userError) {
        console.error("Erro ao buscar dados do usuário:", userError);
        return null;
      }
      
      // Obter dados do usuário a partir da sessão
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return null;
      
      // Criar objeto de usuário com dados combinados
      return {
        id: userId,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || "Usuário",
        email: authUser.email || "",
        plan: userData?.plano || "Teste",
        trialEndsAt: userData?.data_fim,
        paymentMethodId: userData?.stripe_payment_method_id
      };
    } catch (error) {
      console.error("Erro ao buscar dados de usuário:", error);
      return null;
    }
  };

  // Função para atualizar os dados do usuário
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

  useEffect(() => {
    // Verificar sessão do Supabase ao montar o componente
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Obter dados do usuário do localStorage ou criar objeto mínimo
          const storedUser = localStorage.getItem("user");
          
          if (storedUser) {
            // Usar dados armazenados temporariamente
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            
            // Atualizar dados em segundo plano
            const freshUserData = await fetchUserData(data.session.user.id);
            if (freshUserData) {
              setUser(freshUserData);
              localStorage.setItem("user", JSON.stringify(freshUserData));
            }
          } else if (data.session.user) {
            // Buscar dados completos do usuário
            const userData = await fetchUserData(data.session.user.id);
            
            if (userData) {
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
              // Criar objeto mínimo se não encontrar dados
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

    // Configura listener para mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event);
        
        if (event === "SIGNED_IN" && session) {
          // Quando o usuário faz login, atualiza o estado do usuário
          const userData = await fetchUserData(session.user.id);
          
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          } else {
            // Fallback se os dados não forem encontrados
            const updatedUser = {
              id: session.user.id,
              name: session.user.email?.split("@")[0] || "Usuário",
              email: session.user.email || "",
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } else if (event === "SIGNED_OUT") {
          // Quando o usuário sai, limpa o estado do usuário
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    );

    getInitialSession();

    // Limpeza da inscrição ao desmontar
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
        // Buscar dados completos do usuário
        const userData = await fetchUserData(data.user.id);
        
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } else {
          // Fallback para objeto de usuário mínimo
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

  const signup = async (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => {
    setIsLoading(true);
    try {
      // Registrar o usuário com Supabase Auth
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
        // Calcular data de término do teste (14 dias a partir de agora)
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 14);
        const trialEndDate = trialEndsAt.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        
        // Criar registro de assinatura na tabela assinaturas
        if (plan) {
          const { data: planData } = await supabase
            .from('planos')
            .select('preco')
            .eq('nome', plan)
            .maybeSingle();
          
          const preco = planData?.preco || 0;
          
          // Inserir registro de assinatura
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
        
        // Criar objeto de usuário com todos os dados
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
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, refreshUserData }}>
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
