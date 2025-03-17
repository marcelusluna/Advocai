import React, { useState, useContext } from "react";
import { Briefcase, Plus, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";

// Dados de exemplo para processos recentes
const initialCasesData = [
  {
    id: "1",
    number: "0001234-12.2023.8.26.0100",
    client: "Maria Silva",
    type: "Cível",
    date: "Há 3 dias",
    stage: "Inicial"
  },
  {
    id: "2",
    number: "0002345-23.2023.8.26.0100",
    client: "Tech Solutions Ltda.",
    type: "Trabalhista",
    date: "Há 5 dias",
    stage: "Recursal"
  },
  {
    id: "3",
    number: "0003456-34.2023.8.26.0100",
    client: "João Pereira",
    type: "Cível",
    date: "Há 1 semana",
    stage: "Execução"
  },
  {
    id: "4",
    number: "0004567-45.2023.8.26.0100",
    client: "Construções Rápidas S.A.",
    type: "Administrativo",
    date: "Há 2 semanas",
    stage: "Conhecimento"
  }
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Inicial":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Conhecimento":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Recursal":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Execução":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const RecentCases: React.FC = () => {
  const [cases, setCases] = useState(initialCasesData);
  const [filteredCases, setFilteredCases] = useState(initialCasesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [newCase, setNewCase] = useState({
    number: "",
    client: "",
    type: "Cível",
    stage: "Inicial"
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { openDialog } = useContext(CreateEntityContext);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredCases(cases);
      return;
    }
    
    const filtered = cases.filter(item => 
      item.number.toLowerCase().includes(term.toLowerCase()) || 
      item.client.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCases(filtered);
  };

  const addNewCase = () => {
    if (!newCase.number || !newCase.client) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newCaseData = {
      id: (cases.length + 1).toString(),
      number: newCase.number,
      client: newCase.client,
      type: newCase.type,
      date: "Agora",
      stage: newCase.stage
    };

    const updatedCases = [newCaseData, ...cases];
    setCases(updatedCases);
    setFilteredCases(updatedCases);
    setNewCase({ number: "", client: "", type: "Cível", stage: "Inicial" });
    setShowNewCaseDialog(false);
    
    toast({
      title: "Processo adicionado",
      description: `Processo ${newCase.number} foi adicionado com sucesso.`
    });
  };

  const applyFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilteredCases(cases);
    } else {
      setActiveFilter(filter);
      const filtered = cases.filter(item => 
        filter === "all" ? true : item.stage === filter || item.type === filter
      );
      setFilteredCases(filtered);
    }
    setShowFilterDialog(false);
    
    toast({
      title: "Filtro aplicado",
      description: `Lista filtrada com sucesso.`
    });
  };

  const handleNewCase = () => {
    openDialog({
      title: "Adicionar Novo Processo",
      description: "Preencha os campos abaixo para adicionar um novo processo.",
      fields: [
        { id: "number", label: "Número", placeholder: "0000000-00.0000.0.00.0000" },
        { id: "client", label: "Cliente", placeholder: "Nome do cliente" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Cível", label: "Cível" },
            { value: "Trabalhista", label: "Trabalhista" },
            { value: "Tributário", label: "Tributário" },
            { value: "Criminal", label: "Criminal" },
            { value: "Administrativo", label: "Administrativo" }
          ]
        },
        { 
          id: "stage", 
          label: "Fase", 
          placeholder: "Selecione a fase",
          options: [
            { value: "Inicial", label: "Inicial" },
            { value: "Conhecimento", label: "Conhecimento" },
            { value: "Recursal", label: "Recursal" },
            { value: "Execução", label: "Execução" }
          ]
        },
      ],
      submitLabel: "Adicionar Processo",
      entityType: "case"
    });
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up delay-100">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Processos Recentes</h3>
          </div>
          <div className="flex items-center gap-2">
            {showSearch ? (
              <div className="flex items-center bg-muted rounded-md">
                <Input
                  type="text"
                  placeholder="Buscar processo..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-8 text-xs border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => {
                    setShowSearch(false);
                    setSearchTerm("");
                    setFilteredCases(cases);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8",
                    activeFilter && "text-primary bg-primary/10"
                  )}
                  onClick={() => setShowFilterDialog(true)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={handleNewCase}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
            <span className="text-xs text-muted-foreground">Total: {filteredCases.length}</span>
          </div>
        </div>
        
        <div className="p-2">
          {filteredCases.length > 0 ? (
            filteredCases.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.number}</span>
                  <span className="text-xs text-muted-foreground">{item.client} • {item.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    getStageColor(item.stage)
                  )}>
                    {item.stage}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>Nenhum processo encontrado</p>
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-border">
          <Button 
            variant="link" 
            className="text-sm text-primary hover:text-primary/80 transition-colors w-full text-center"
            onClick={() => {
              toast({
                title: "Redirecionando",
                description: "Você seria redirecionado para a página de todos os processos."
              });
            }}
          >
            Ver todos os processos
          </Button>
        </div>
      </div>

      {/* Dialog para filtros */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrar Processos</DialogTitle>
            <DialogDescription>
              Selecione os critérios para filtrar a lista de processos.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Tipo</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === "Cível" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Cível")}
                >
                  Cível
                </Button>
                <Button 
                  variant={activeFilter === "Trabalhista" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Trabalhista")}
                >
                  Trabalhista
                </Button>
                <Button 
                  variant={activeFilter === "Administrativo" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Administrativo")}
                >
                  Administrativo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Fase</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === "Inicial" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Inicial")}
                >
                  Inicial
                </Button>
                <Button 
                  variant={activeFilter === "Conhecimento" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Conhecimento")}
                >
                  Conhecimento
                </Button>
                <Button 
                  variant={activeFilter === "Recursal" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Recursal")}
                >
                  Recursal
                </Button>
                <Button 
                  variant={activeFilter === "Execução" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Execução")}
                >
                  Execução
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveFilter(null);
                setFilteredCases(cases);
                setShowFilterDialog(false);
              }}
            >
              Limpar Filtros
            </Button>
            <Button onClick={() => setShowFilterDialog(false)}>Aplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecentCases;
