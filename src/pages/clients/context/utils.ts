
import { Client } from "./types";

// Map from database schema to Client type
export const mapDbToClient = (dbClient: any): Client => {
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
