
import React, { createContext, useState, useContext } from "react";

// Define contract type
export type Contract = {
  id: string;
  title: string;
  client: string;
  value: string;
  startDate: string;
  endDate: string;
  status: string;
  alerts: number;
};

// Define alert type
export type ContractAlert = {
  id: string;
  contract: string;
  client: string;
  type: string;
  date: string;
  priority: string;
  description: string;
};

// Initial contract data
const contractsData: Contract[] = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços",
    client: "Tech Solutions Ltda.",
    value: "R$ 45.000,00",
    startDate: "01/05/2023",
    endDate: "01/05/2024",
    status: "ativo",
    alerts: 0
  },
  {
    id: "2",
    title: "Contrato de Consultoria Jurídica",
    client: "Construções Rápidas S.A.",
    value: "R$ 60.000,00",
    startDate: "15/03/2023",
    endDate: "15/03/2024",
    status: "ativo",
    alerts: 2
  },
  {
    id: "3",
    title: "Acordo de Confidencialidade",
    client: "Global Importações Ltda.",
    value: "N/A",
    startDate: "10/06/2023",
    endDate: "10/06/2025",
    status: "pendente",
    alerts: 0
  },
  {
    id: "4",
    title: "Contrato de Representação Legal",
    client: "Maria Silva",
    value: "R$ 12.000,00",
    startDate: "05/04/2023",
    endDate: "05/04/2024",
    status: "ativo",
    alerts: 1
  },
  {
    id: "5",
    title: "Contrato de Assessoria Jurídica",
    client: "João Pereira",
    value: "R$ 8.000,00",
    startDate: "20/01/2023",
    endDate: "20/01/2024",
    status: "finalizado",
    alerts: 0
  }
];

// Contract alerts data
const contractAlertsData: ContractAlert[] = [
  {
    id: "1",
    contract: "Contrato de Consultoria Jurídica",
    client: "Construções Rápidas S.A.",
    type: "Renovação",
    date: "15/03/2024",
    priority: "alta",
    description: "Contrato expira em 30 dias"
  },
  {
    id: "2",
    contract: "Contrato de Consultoria Jurídica",
    client: "Construções Rápidas S.A.",
    type: "Pagamento",
    date: "15/07/2023",
    priority: "média",
    description: "Pagamento trimestral"
  },
  {
    id: "3",
    contract: "Contrato de Representação Legal",
    client: "Maria Silva",
    type: "Obrigação",
    date: "05/08/2023",
    priority: "média",
    description: "Entrega de relatório mensal"
  }
];

// Utility functions
export const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "finalizado":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "cancelado":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta":
      return "bg-red-100 text-red-800 border-red-200";
    case "média":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "baixa":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Context type
type ContractsContextType = {
  contracts: Contract[];
  contractAlerts: ContractAlert[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredContracts: Contract[];
  handleNewContract: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Create context
const ContractsContext = createContext<ContractsContextType | undefined>(undefined);

// Provider component
export const ContractsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  const [contractAlerts] = useState<ContractAlert[]>(contractAlertsData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter contracts based on search term
  const filteredContracts = contracts.filter(contract => 
    contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Open dialog to add new contract
  const handleNewContract = () => {
    // This will be implemented in the Contracts component
  };
  
  const value = {
    contracts,
    contractAlerts,
    searchTerm,
    setSearchTerm,
    filteredContracts,
    handleNewContract,
    handleSearch
  };
  
  return (
    <ContractsContext.Provider value={value}>
      {children}
    </ContractsContext.Provider>
  );
};

// Custom hook to use the contracts context
export const useContractsContext = () => {
  const context = useContext(ContractsContext);
  if (context === undefined) {
    throw new Error("useContractsContext must be used within a ContractsProvider");
  }
  return context;
};
