
import React, { createContext, useState, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";

// Define client type
export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  createdAt: string;
  status: string;
};

// Initial client data
const clientsData: Client[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "(11) 98765-4321",
    type: "Pessoa Física",
    createdAt: "12/03/2023",
    status: "ativo"
  },
  {
    id: "2",
    name: "Tech Solutions Ltda.",
    email: "contato@techsolutions.com",
    phone: "(11) 3456-7890",
    type: "Pessoa Jurídica",
    createdAt: "25/04/2023",
    status: "ativo"
  },
  {
    id: "3",
    name: "João Pereira",
    email: "joao.pereira@example.com",
    phone: "(21) 99876-5432",
    type: "Pessoa Física",
    createdAt: "05/01/2023",
    status: "pendente"
  },
  {
    id: "4",
    name: "Construções Rápidas S.A.",
    email: "contato@construcoesrapidas.com",
    phone: "(11) 2345-6789",
    type: "Pessoa Jurídica",
    createdAt: "17/05/2023",
    status: "ativo"
  },
  {
    id: "5",
    name: "Ana Beatriz Mendes",
    email: "anabeatriz@example.com",
    phone: "(11) 97654-3210",
    type: "Pessoa Física",
    createdAt: "22/06/2023",
    status: "inativo"
  },
  {
    id: "6",
    name: "Global Importações Ltda.",
    email: "contato@globalimport.com",
    phone: "(11) 4567-8901",
    type: "Pessoa Jurídica",
    createdAt: "08/02/2023",
    status: "ativo"
  }
];

// Context type
type ClientsContextType = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredClients: Client[];
  handleNewClient: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Create context
const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// Provider component
export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openDialog, closeDialog } = useContext(CreateEntityContext);
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );
  
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Open dialog to add new client
  const handleNewClient = () => {
    openDialog({
      title: "Adicionar Novo Cliente",
      description: "Preencha os campos abaixo para adicionar um novo cliente.",
      fields: [
        { id: "name", label: "Nome", placeholder: "Nome do cliente" },
        { id: "email", label: "Email", placeholder: "email@exemplo.com", type: "email" },
        { id: "phone", label: "Telefone", placeholder: "(00) 00000-0000" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Pessoa Física", label: "Pessoa Física" },
            { value: "Pessoa Jurídica", label: "Pessoa Jurídica" }
          ]
        },
        {
          id: "status",
          label: "Status",
          placeholder: "Selecione o status",
          options: [
            { value: "ativo", label: "Ativo" },
            { value: "pendente", label: "Pendente" },
            { value: "inativo", label: "Inativo" }
          ]
        }
      ],
      submitLabel: "Adicionar Cliente",
      entityType: "client",
      onSubmit: (formData) => {
        // Criar um novo cliente com os dados do formulário
        const newClient = {
          id: (clients.length + 1).toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "(00) 0000-0000",
          type: formData.type || "Pessoa Física",
          createdAt: new Date().toLocaleDateString('pt-BR'),
          status: formData.status || "ativo"
        };
        
        // Adicionar o novo cliente ao início da lista
        setClients(prev => [newClient, ...prev]);
        
        // Exibir mensagem de sucesso
        toast({
          title: "Cliente adicionado",
          description: `O cliente ${formData.name} foi adicionado com sucesso`,
        });
        
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
    handleSearch
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
export const getStatusColor = (status: string) => {
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
