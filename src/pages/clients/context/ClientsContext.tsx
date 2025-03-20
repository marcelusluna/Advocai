
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";

// Define client type to match the database schema
export type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  type: string | null;
  createdAt: string;
  status: string | null;
  cpf_cnpj?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  notes?: string | null;
};

// Map from database schema to Client type
const mapDbToClient = (dbClient: any): Client => {
  return {
    id: dbClient.id,
    name: dbClient.nome,
    email: dbClient.email,
    phone: dbClient.telefone,
    type: dbClient.tipo,
    createdAt: new Date(dbClient.created_at).toLocaleDateString('pt-BR'),
    status: 'ativo', // Default status if not specified
    cpf_cnpj: dbClient.cpf_cnpj,
    address: dbClient.endereco,
    city: dbClient.cidade,
    state: dbClient.estado,
    zipCode: dbClient.cep,
    notes: dbClient.observacoes
  };
};

// Context type
type ClientsContextType = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredClients: Client[];
  handleNewClient: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  refreshClients: () => Promise<void>;
};

// Create context
const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// Provider component
export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openDialog, closeDialog } = useContext(CreateEntityContext);
  const { toast } = useToast();
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  
  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.phone && client.phone.includes(searchTerm))
  );
  
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Open dialog to add new client
  const handleNewClient = () => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "Você precisa estar autenticado para adicionar clientes.",
        variant: "destructive",
      });
      return;
    }
    
    openDialog({
      title: "Adicionar Novo Cliente",
      description: "Preencha os campos abaixo para adicionar um novo cliente.",
      fields: [
        { id: "name", label: "Nome", placeholder: "Nome do cliente", required: true },
        { id: "email", label: "Email", placeholder: "email@exemplo.com", type: "email" },
        { id: "phone", label: "Telefone", placeholder: "(00) 00000-0000" },
        { id: "cpf_cnpj", label: "CPF/CNPJ", placeholder: "000.000.000-00 ou 00.000.000/0000-00" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Pessoa Física", label: "Pessoa Física" },
            { value: "Pessoa Jurídica", label: "Pessoa Jurídica" }
          ]
        },
        { id: "address", label: "Endereço", placeholder: "Endereço completo" },
        { id: "city", label: "Cidade", placeholder: "Cidade" },
        { id: "state", label: "Estado", placeholder: "Estado" },
        { id: "zipCode", label: "CEP", placeholder: "00000-000" },
        {
          id: "status",
          label: "Status",
          placeholder: "Selecione o status",
          options: [
            { value: "ativo", label: "Ativo" },
            { value: "pendente", label: "Pendente" },
            { value: "inativo", label: "Inativo" }
          ]
        },
        { id: "notes", label: "Observações", placeholder: "Observações adicionais", multiline: true }
      ],
      submitLabel: "Adicionar Cliente",
      entityType: "client",
      onSubmit: async (formData) => {
        try {
          // Preparar dados para o Supabase (formato snake_case)
          const clientData = {
            advogado_id: user.id,
            nome: formData.name,
            email: formData.email || null,
            telefone: formData.phone || null,
            cpf_cnpj: formData.cpf_cnpj || null,
            tipo: formData.type || "Pessoa Física",
            endereco: formData.address || null,
            cidade: formData.city || null,
            estado: formData.state || null,
            cep: formData.zipCode || null,
            observacoes: formData.notes || null
          };
          
          // Inserir no Supabase
          const { data, error } = await supabase
            .from('clientes')
            .insert(clientData)
            .select()
            .single();
          
          if (error) throw error;
          
          if (data) {
            // Criar objeto cliente no formato da aplicação
            const newClient: Client = {
              id: data.id,
              name: data.nome,
              email: data.email,
              phone: data.telefone,
              type: data.tipo,
              createdAt: new Date(data.created_at).toLocaleDateString('pt-BR'),
              status: formData.status || "ativo",
              cpf_cnpj: data.cpf_cnpj,
              address: data.endereco,
              city: data.cidade,
              state: data.estado,
              zipCode: data.cep,
              notes: data.observacoes
            };
            
            // Adicionar o novo cliente ao início da lista
            setClients(prev => [newClient, ...prev]);
            
            // Exibir mensagem de sucesso
            toast({
              title: "Cliente adicionado",
              description: `O cliente ${formData.name} foi adicionado com sucesso`,
            });
          }
        } catch (error: any) {
          console.error("Erro ao adicionar cliente:", error);
          toast({
            title: "Erro ao adicionar cliente",
            description: error.message || "Não foi possível adicionar o cliente",
            variant: "destructive",
          });
        }
        
        closeDialog();
      }
    });
  };
  
  const value = {
    clients,
    setClients,
    searchTerm,
    setSearchTerm,
    filteredClients,
    handleNewClient,
    handleSearch,
    isLoading,
    refreshClients
  };
  
  return (
    <ClientsContext.Provider value={value}>
      {children}
    </ClientsContext.Provider>
  );
};

// Custom hook to use the clients context
export const useClientsContext = () => {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error("useClientsContext must be used within a ClientsProvider");
  }
  return context;
};

// Utility function for status styling
export const getStatusColor = (status: string | null) => {
  if (!status) return "bg-gray-100 text-gray-800 border-gray-200";
  
  switch (status) {
    case "ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "inativo":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};
