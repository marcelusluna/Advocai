
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { useContractsContext } from "../context/ContractsContext";
import { CreateEntityContext } from "@/layouts/main-layout";

const ContractsHeader: React.FC = () => {
  const { handleNewContract } = useContractsContext();
  const { openDialog } = useContext(CreateEntityContext);
  
  const handleNewContractClick = () => {
    openDialog({
      title: "Adicionar Novo Contrato",
      description: "Preencha os campos abaixo para adicionar um novo contrato.",
      fields: [
        { id: "title", label: "Título", placeholder: "Título do contrato" },
        { id: "client", label: "Cliente", placeholder: "Nome do cliente" },
        { id: "value", label: "Valor", placeholder: "R$ 0,00" },
        { id: "startDate", label: "Data de Início", placeholder: "DD/MM/AAAA" },
        { id: "endDate", label: "Data de Término", placeholder: "DD/MM/AAAA" },
        { 
          id: "status", 
          label: "Status", 
          placeholder: "Selecione o status",
          options: [
            { value: "ativo", label: "Ativo" },
            { value: "pendente", label: "Pendente" },
            { value: "finalizado", label: "Finalizado" },
            { value: "cancelado", label: "Cancelado" }
          ]
        },
      ],
      submitLabel: "Adicionar Contrato",
      entityType: "contract"
    });
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Contratos</h1>
        <p className="text-muted-foreground">
          Gerencie seus contratos e acordos legais
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
        <Button onClick={handleNewContractClick}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Contrato
        </Button>
      </div>
    </div>
  );
};

export default ContractsHeader;
