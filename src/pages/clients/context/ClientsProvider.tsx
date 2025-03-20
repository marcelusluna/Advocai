
import React, { createContext, useState, useContext } from "react";
import { useClientsData } from "./useClientsData";
import { useNewClientDialog } from "./useNewClientDialog";
import { ClientsContextType, Client } from "./types";
import { getStatusColor } from "./utils";

// Create context
const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// Provider component
export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clients, setClients, isLoading, refreshClients } = useClientsData();
  const [searchTerm, setSearchTerm] = useState("");
  const { handleNewClient } = useNewClientDialog(setClients);
  
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

// Re-export the status color utility
export { getStatusColor };
