import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import AuthRoutes from "./components/auth/auth-routes";
import { useEffect, useState } from "react";

// Definindo o cliente de consulta com configuração de retry
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

// Componente para lidar com erros de navegação
const ErrorHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Adiciona listener para erros não capturados
    const handleError = (event: ErrorEvent) => {
      console.error("Erro não capturado:", event.error);
      
      // Tenta navegar para a página inicial em caso de erro crítico
      if (event.error?.message?.includes("navigation")) {
        navigate("/", { replace: true });
      }
    };
    
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [navigate]);
  
  return null;
};

// Componente principal da aplicação
const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    // Monitora o status da conexão
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  
  // Exibe mensagem quando offline
  if (!isOnline) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-red-600">Sem conexão com a internet</h2>
          <p className="text-gray-700">
            Verifique sua conexão e tente novamente. Alguns recursos podem não estar disponíveis no modo offline.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorHandler />
          <main className="overflow-container">
            <AuthProvider>
              <AuthRoutes />
            </AuthProvider>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
