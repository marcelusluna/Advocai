import React, { useState, useContext, useEffect } from "react";
import { Briefcase, Plus, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/auth-provider";

// Interface para tipagem dos processos
interface Case {
  id: string;
  number: string;
  client: string;
  type: string;
  date: string;
  stage: string;
  created_at?: string;
}

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
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { openDialog } = useContext(CreateEntityContext);
  const { user } = useAuth();

  // Carregar processos ao iniciar o componente
  useEffect(() => {
    fetchCases();
  }, [user]);

  // Função para buscar processos no Supabase
  const fetchCases = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let query = supabase.from('processos').select('*');
      
      if (!user.isAdmin) {
        // Filtra por advogado_id se não for admin
        query = query.eq('advogado_id', user.id);
      }
      
      // Limita aos processos mais recentes
      const { data, error } = await query.order('created_at', { ascending: false }).limit(5);
      
      if (error) {
        console.error("Erro ao buscar processos:", error);
        toast({
          title: "Erro ao carregar processos",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedCases: Case[] = data.map(proc => ({
          id: proc.id,
          number: proc.numero,
          client: proc.cliente,
          type: proc.tipo,
          date: proc.created_at ? `Há ${getRelativeTime(new Date(proc.created_at))}` : "Recente",
          stage: proc.fase || "Inicial",
          created_at: proc.created_at
        }));
        
        setCases(mappedCases);
        setFilteredCases(mappedCases);
      }
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para calcular tempo relativo
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "hoje";
    if (diffDays === 1) return "1 dia";
    if (diffDays < 7) return `${diffDays} dias`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semana(s)`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} mês(es)`;
    return `${Math.floor(diffDays / 365)} ano(s)`;
  };

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
    if (!user) {
      toast({
        title: "Usuário não autenticado",
        description: "Você precisa estar logado para adicionar processos.",
        variant: "destructive",
      });
      return;
    }

    openDialog({
      title: "Adicionar Novo Processo",
      description: "Preencha os campos abaixo para adicionar um novo processo.",
      fields: [
        { id: "number", label: "Número", placeholder: "0000000-00.0000.0.00.0000", required: true },
        { id: "client", label: "Cliente", placeholder: "Nome do cliente", required: true },
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
      entityType: "case",
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          
          // Preparar dados para o Supabase
          const caseData = {
            advogado_id: user.id,
            numero: formData.number,
            cliente: formData.client,
            tipo: formData.type || "Cível",
            fase: formData.stage || "Inicial"
          };
          
          // Inserir no Supabase
          const { data, error } = await supabase
            .from('processos')
            .insert(caseData)
            .select()
            .single();
          
          if (error) throw error;
          
          if (data) {
            // Criar objeto de processo no formato da aplicação
            const newCase: Case = {
              id: data.id,
              number: data.numero,
              client: data.cliente,
              type: data.tipo,
              date: "Agora",
              stage: data.fase,
            };
            
            // Adicionar o novo processo ao início da lista
            const updatedCases = [newCase, ...cases.slice(0, cases.length > 4 ? 4 : cases.length)];
            setCases(updatedCases);
            setFilteredCases(updatedCases);
            
            // Exibir mensagem de sucesso
            toast({
              title: "Processo adicionado",
              description: `O processo ${formData.number} foi adicionado com sucesso`,
            });
          }
        } catch (error: any) {
          console.error("Erro ao adicionar processo:", error);
          toast({
            title: "Erro ao adicionar processo",
            description: error.message || "Não foi possível adicionar o processo",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
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
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">
              Carregando processos...
            </div>
          ) : filteredCases.length > 0 ? (
            filteredCases.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{item.number}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStageColor(item.stage)}`}>
                      {item.stage}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.client}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                      {item.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Nenhum processo encontrado
            </div>
          )}
        </div>
      </div>

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrar Processos</DialogTitle>
            <DialogDescription>
              Selecione os filtros que deseja aplicar à lista de processos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <h4 className="text-sm font-medium">Por Fase</h4>
            <div className="flex flex-wrap gap-2">
              {["Inicial", "Conhecimento", "Recursal", "Execução"].map((fase) => (
                <Button 
                  key={fase}
                  variant={activeFilter === fase ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyFilter(fase)}
                  className="text-xs h-8"
                >
                  {fase}
                </Button>
              ))}
            </div>
            
            <h4 className="text-sm font-medium">Por Tipo</h4>
            <div className="flex flex-wrap gap-2">
              {["Cível", "Trabalhista", "Tributário", "Criminal", "Administrativo"].map((tipo) => (
                <Button 
                  key={tipo}
                  variant={activeFilter === tipo ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyFilter(tipo)}
                  className="text-xs h-8"
                >
                  {tipo}
                </Button>
              ))}
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
            <Button onClick={() => setShowFilterDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecentCases;
