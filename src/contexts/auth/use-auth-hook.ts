import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";
import { fetchUserData, isAdminEmail, isAdminCredentials } from "./auth-utils";

export const useAuthHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Função para atualizar o perfil do usuário
  const updateUserProfile = async (profileData: Partial<User>) => {
    if (!user?.id) {
      throw new Error("Usuário não autenticado");
    }
    
    try {
      setIsLoading(true);
      
      // Preparar dados para a tabela perfil_advogado
      const perfilData = {
        user_id: user.id,
        nome: profileData.name,
        email: profileData.email,
        telefone: profileData.phone,
        bio: profileData.bio,
        oab: profileData.oab,
        updated_at: new Date().toISOString()
      };
      
      // Verificar se já existe um perfil
      let profileId = user.profileId;
      
      if (profileId) {
        // Atualizar perfil existente
        const { error } = await supabase
          .from('perfil_advogado')
          .update(perfilData)
          .eq('id', profileId);
          
        if (error) throw error;
      } else {
        // Criar novo perfil
        const { data, error } = await supabase
          .from('perfil_advogado')
          .insert({
            ...perfilData,
            created_at: new Date().toISOString()
          })
          .select('id')
          .single();
          
        if (error) throw error;
        if (data) profileId = data.id;
      }
      
      // Atualizar metadados do usuário no Auth
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          name: profileData.name
        }
      });
      
      if (metadataError) {
        console.error("Erro ao atualizar metadados:", metadataError);
        // Continuar mesmo com erro
      }
      
      // Atualizar dados no estado local
      const updatedUser = {
        ...user,
        ...profileData,
        profileId
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          const storedUser = localStorage.getItem("user");
          
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            
            const freshUserData = await fetchUserData(data.session.user.id);
            if (freshUserData) {
              setUser(freshUserData);
              localStorage.setItem("user", JSON.stringify(freshUserData));
            }
          } else if (data.session.user) {
            const userData = await fetchUserData(data.session.user.id);
            
            if (userData) {
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event);
        
        if (event === "SIGNED_IN" && session) {
          const userData = await fetchUserData(session.user.id);
          
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          } else {
            const updatedUser = {
              id: session.user.id,
              name: session.user.email?.split("@")[0] || "Usuário",
              email: session.user.email || "",
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } else if (event === "SIGNED_OUT") {
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    );

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Special case for admin login
      if (isAdminCredentials(email, password)) {
        console.log("Admin credentials detected, performing admin login");
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error("Admin login error:", error);
          // If the admin account doesn't exist yet in Supabase, create it
          if (error.message.includes("Invalid login credentials")) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name: "Administrador",
                  isAdmin: true
                },
              },
            });
            
            if (signUpError) throw signUpError;
            
            if (signUpData.user) {
              const adminUser: User = {
                id: signUpData.user.id,
                name: "Administrador",
                email: email,
                plan: "Administrador",
                isAdmin: true
              };
              
              localStorage.setItem("user", JSON.stringify(adminUser));
              setUser(adminUser);
              
              toast({
                title: "Conta de administrador criada",
                description: "Bem-vindo ao painel de administração!",
              });
              
              return;
            }
          } else {
            throw error;
          }
        }
        
        if (data.user) {
          const adminUser: User = {
            id: data.user.id,
            name: data.user.user_metadata?.name || "Administrador",
            email: data.user.email || "",
            plan: "Administrador",
            isAdmin: true
          };
          
          localStorage.setItem("user", JSON.stringify(adminUser));
          setUser(adminUser);
          
          toast({
            title: "Login de administrador",
            description: "Bem-vindo ao painel de administração!",
          });
        }
        
        return;
      }
      
      // Regular user login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const isAdmin = isAdminEmail(email);
        
        if (isAdmin) {
          const adminUser = {
            id: data.user.id,
            name: data.user.email?.split("@")[0] || "Admin",
            email: data.user.email || "",
            plan: "Administrador",
            isAdmin: true
          };
          
          localStorage.setItem("user", JSON.stringify(adminUser));
          setUser(adminUser);
          
          toast({
            title: "Login de administrador",
            description: "Bem-vindo ao painel de administração!",
          });
        } else {
          const userData = await fetchUserData(data.user.id);
          
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          } else {
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
        }
        
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
      if (isAdminEmail(email)) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              isAdmin: true
            },
          },
        });
        
        if (authError) throw authError;
        
        if (authData.user) {
          const adminUser = {
            id: authData.user.id,
            name,
            email,
            plan: "Administrador",
            isAdmin: true
          };
          
          localStorage.setItem("user", JSON.stringify(adminUser));
          setUser(adminUser);
          
          toast({
            title: "Conta de administrador criada",
            description: "Bem-vindo ao painel de administração do Advoc.AI!",
          });
          
          navigate("/dashboard");
        }
      } else {
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
          const trialEndsAt = new Date();
          trialEndsAt.setDate(trialEndsAt.getDate() + 14);
          const trialEndDate = trialEndsAt.toISOString().split('T')[0];
          
          if (plan) {
            const { data: planData } = await supabase
              .from('planos')
              .select('preco')
              .eq('nome', plan)
              .maybeSingle();
            
            const preco = planData?.preco || 0;
            
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
          
          const newUser = {
            id: authData.user.id,
            name,
            email,
            plan: plan || "Teste",
            trialEndsAt: trialEndDate,
            paymentMethodId: paymentMethod,
            isAdmin: false
          };
          
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
          
          toast({
            title: "Conta criada com sucesso",
            description: "Bem-vindo ao Advoc.AI! Seu período de teste gratuito de 14 dias começou.",
          });
          
          navigate("/dashboard");
        }
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

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    refreshUserData,
    updateUserProfile,
  };
};
