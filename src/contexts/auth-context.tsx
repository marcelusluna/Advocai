
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  planType?: "professional" | "advanced";
  planActive?: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, planType?: "professional" | "advanced") => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock authentication - in a real app, this would call an API
      // Simulating network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo login - in production this would validate credentials against a backend
      if (email && password) {
        // Check if user exists in localStorage (simulating a database)
        const usersStr = localStorage.getItem("users");
        let users = usersStr ? JSON.parse(usersStr) : [];
        
        const existingUser = users.find((u: User) => u.email === email);
        
        if (existingUser && existingUser.planActive) {
          localStorage.setItem("user", JSON.stringify(existingUser));
          setUser(existingUser);
          toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo ao Advoc.AI!",
          });
          navigate("/dashboard");
        } else if (existingUser) {
          toast({
            title: "Plano não ativo",
            description: "É necessário ativar um plano para acessar a plataforma.",
            variant: "destructive",
          });
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, planType?: "professional" | "advanced") => {
    setIsLoading(true);
    try {
      // Mock signup - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        // Check if plan was activated through checkout
        const state = location.state as { planActivated?: boolean; planType?: "professional" | "advanced" } | undefined;
        const planActivated = state?.planActivated || false;
        const selectedPlan = state?.planType || planType || "professional";
        
        if (!planActivated) {
          toast({
            title: "É necessário escolher um plano",
            description: "Retorne à página inicial e selecione um plano para continuar.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        
        // Create a new user
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          planType: selectedPlan,
          planActive: true,
        };
        
        // Save to users "database" (localStorage in this demo)
        const usersStr = localStorage.getItem("users");
        let users = usersStr ? JSON.parse(usersStr) : [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        // Set active user
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        
        toast({
          title: "Conta criada com sucesso",
          description: `Plano ${selectedPlan === "professional" ? "Profissional" : "Avançado"} ativado. Bem-vindo ao Advoc.AI!`,
        });
        
        navigate("/dashboard");
      } else {
        throw new Error("Missing required fields");
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta.",
    });
    navigate("/");
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
