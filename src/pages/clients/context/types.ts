
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

// Context type
export type ClientsContextType = {
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

// Type for the dialog field
export type DialogField = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  options?: { value: string; label: string }[];
  required?: boolean;
};
