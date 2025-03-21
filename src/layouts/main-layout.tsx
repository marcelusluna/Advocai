import React, { useState } from "react";
import Sidebar from "@/components/navigation/sidebar";
import AiAssistant from "@/components/ai/ai-assistant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export type DialogConfig = {
  isOpen: boolean;
  title: string;
  description: string;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  submitLabel: string;
  entityType: 'client' | 'case' | 'contract' | 'document' | 'invoice';
  onSubmit?: (formData: Record<string, string>) => void;
};

// Este contexto permite que qualquer componente filho acesse e manipule o diálogo
export const CreateEntityContext = React.createContext<{
  openDialog: (config: Omit<DialogConfig, 'isOpen'>) => void;
  closeDialog: () => void;
}>({
  openDialog: () => {},
  closeDialog: () => {},
});

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    fields: [],
    submitLabel: '',
    entityType: 'client',
  });
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const openDialog = (config: Omit<DialogConfig, 'isOpen'>) => {
    console.log("Opening dialog with config:", config);
    setDialogConfig({ ...config, isOpen: true });
    setFormData({});
  };

  const closeDialog = () => {
    setDialogConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Verificar se todos os campos obrigatórios estão preenchidos
    const missingFields = dialogConfig.fields.filter(
      field => !formData[field.id] && field.type !== 'optional'
    );

    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Se existir uma função de callback onSubmit, chamá-la com os dados do formulário
    if (dialogConfig.onSubmit) {
      dialogConfig.onSubmit(formData);
      return;
    }

    // Comportamento padrão (caso não haja callback)
    const entityLabels = {
      client: "Cliente",
      case: "Processo",
      contract: "Contrato",
      document: "Documento",
      invoice: "Fatura"
    };

    const paths = {
      client: "/clients",
      case: "/cases",
      contract: "/contracts",
      document: "/documents",
      invoice: "/billing"
    };

    toast({
      title: `${entityLabels[dialogConfig.entityType]} criado`,
      description: `${entityLabels[dialogConfig.entityType]} foi criado com sucesso.`,
    });

    closeDialog();

    // Se não estiver já na página de destino, redirecionar
    const targetPath = paths[dialogConfig.entityType];
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-container p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
