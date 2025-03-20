
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  plan?: string;
  trialEndsAt?: string; // Add trial end date
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
        // Mock user for demo
        const loggedInUser = {
          id: "1",
          name: email.split("@")[0],
          email,
          plan: "Avançado", // Poderia vir do backend
        };
        
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao Advoc.AI!",
        });
        // Note: Navigation is now handled in the Login component
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
      throw error; // Re-throw to handle in component
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => {
    setIsLoading(true);
    try {
      // Mock signup - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        // Calculate trial end date (14 days from now)
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 14);
        
        // Create a new user with trial information
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          plan: plan || "Teste",
          trialEndsAt: trialEndsAt.toISOString(),
          paymentMethod: paymentMethod || null,
        };
        
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        
        toast({
          title: "Conta criada com sucesso",
          description: "Bem-vindo ao Advoc.AI! Seu período de teste gratuito de 14 dias começou.",
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
