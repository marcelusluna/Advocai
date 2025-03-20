
import { useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { Client, DialogField } from "./types";

export const useNewClientDialog = (setClients: React.Dispatch<React.SetStateAction<Client[]>>) => {
  const { openDialog, closeDialog } = useContext(CreateEntityContext);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleNewClient = () => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "Você precisa estar autenticado para adicionar clientes.",
        variant: "destructive",
      });
      return;
    }
    
    const fields: DialogField[] = [
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
    ];
    
    openDialog({
      title: "Adicionar Novo Cliente",
      description: "Preencha os campos abaixo para adicionar um novo cliente.",
      fields,
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

  return { handleNewClient };
};
