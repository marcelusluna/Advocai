
import React, { useState } from "react";
import Sidebar from "@/components/navigation/sidebar";
import AiAssistant from "@/components/ai/ai-assistant";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
    <CreateEntityContext.Provider value={{ openDialog, closeDialog }}>
      <div className="flex min-h-screen bg-slate-50 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          } overflow-y-auto overflow-x-hidden relative pb-16`}
        >
          <div className="max-w-full p-6">
            {children}
          </div>
        </main>
        <AiAssistant />

        {/* Diálogo para criação de entidades */}
        <Dialog open={dialogConfig.isOpen} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{dialogConfig.title}</DialogTitle>
              <DialogDescription>
                {dialogConfig.description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {dialogConfig.fields.map((field) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor={field.id} className="text-right text-sm font-medium">
                    {field.label}
                  </label>
                  {field.options ? (
                    <select
                      id={field.id}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    >
                      <option value="">Selecione uma opção</option>
                      {field.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      className="col-span-3"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeDialog}>Cancelar</Button>
              <Button onClick={handleSubmit}>{dialogConfig.submitLabel}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CreateEntityContext.Provider>
  );
};

export default MainLayout;
