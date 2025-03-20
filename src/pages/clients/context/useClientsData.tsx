
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { Client } from "./types";
import { mapDbToClient } from "./utils";

export const useClientsData = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch clients from Supabase
  const fetchClients = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('advogado_id', user.id);
      
      if (error) {
        console.error("Erro ao buscar clientes:", error);
        toast({
          title: "Erro ao carregar clientes",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedClients = data.map(mapDbToClient);
        setClients(mappedClients);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Refresh clients data
  const refreshClients = async () => {
    await fetchClients();
  };
  
  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      fetchClients();
    } else {
      // Limpar dados quando não há usuário autenticado
      setClients([]);
      setIsLoading(false);
    }
  }, [user?.id]);

  return {
    clients,
    setClients,
    isLoading,
    refreshClients
  };
};
