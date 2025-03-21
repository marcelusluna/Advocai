import React, { useState, useContext, useEffect } from "react";
import { Calendar, Plus, Search, Filter, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/auth-provider";
import { format, addDays, isToday, isTomorrow, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Interface para tipagem das tarefas
interface Task {
  id: string;
  title: string;
  priority: "alta" | "média" | "baixa";
  deadline: string;
  case?: string;
  client?: string;
  completed: boolean;
  display_date?: string;
  created_at?: string;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta":
      return "bg-red-100 text-red-800 border-red-200";
    case "média":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "baixa":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const UpcomingTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { openDialog } = useContext(CreateEntityContext);
  const { user } = useAuth();

  // Carregar tarefas ao iniciar o componente
  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Função para buscar tarefas no Supabase
  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let query = supabase.from('tarefas').select('*');
      
      if (!user.isAdmin) {
        // Filtra por advogado_id se não for admin
        query = query.eq('advogado_id', user.id);
      }
      
      // Limita às tarefas próximas, não concluídas
      const { data, error } = await query
        .eq('completed', false)
        .order('deadline', { ascending: true })
        .limit(5);
      
      if (error) {
        console.error("Erro ao buscar tarefas:", error);
        toast({
          title: "Erro ao carregar tarefas",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedTasks: Task[] = data.map(task => {
          // Formatar data para exibição
          let deadline = task.deadline ? parseISO(task.deadline) : new Date();
          let displayDate = "";
          
          if (isToday(deadline)) {
            displayDate = "Hoje";
          } else if (isTomorrow(deadline)) {
            displayDate = "Amanhã";
          } else {
            displayDate = format(deadline, "dd/MM/yyyy", { locale: ptBR });
          }
          
          return {
            id: task.id,
            title: task.titulo,
            priority: task.prioridade || "média",
            deadline: task.deadline,
            case: task.processo,
            client: task.cliente,
            completed: !!task.completed,
            display_date: displayDate,
            created_at: task.created_at
          };
        });
        
        setTasks(mappedTasks);
        setFilteredTasks(mappedTasks);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredTasks(tasks);
      return;
    }
    
    const filtered = tasks.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) || 
      (item.client && item.client.toLowerCase().includes(term.toLowerCase())) ||
      (item.case && item.case.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredTasks(filtered);
  };

  const applyFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilteredTasks(tasks);
    } else {
      setActiveFilter(filter);
      const filtered = tasks.filter(item => 
        filter === "all" ? true : item.priority === filter
      );
      setFilteredTasks(filtered);
    }
    setShowFilterDialog(false);
    
    toast({
      title: "Filtro aplicado",
      description: `Lista filtrada com sucesso.`
    });
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      setIsLoading(true);
      
      // Atualizar no Supabase
      const { error } = await supabase
        .from('tarefas')
        .update({ completed: !completed })
        .eq('id', taskId);
      
      if (error) throw error;
      
      // Atualizar estado local
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !completed } : task
      );
      
      const filteredUpdatedTasks = completed 
        ? updatedTasks 
        : updatedTasks.filter(task => !task.completed);
      
      setTasks(updatedTasks);
      setFilteredTasks(filteredUpdatedTasks);
      
      toast({
        title: completed ? "Tarefa reaberta" : "Tarefa concluída",
        description: `A tarefa foi marcada como ${completed ? "não concluída" : "concluída"}.`
      });
    } catch (error: any) {
      console.error("Erro ao atualizar tarefa:", error);
      toast({
        title: "Erro ao atualizar tarefa",
        description: error.message || "Não foi possível atualizar o status da tarefa",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTask = () => {
    if (!user) {
      toast({
        title: "Usuário não autenticado",
        description: "Você precisa estar logado para adicionar tarefas.",
        variant: "destructive",
      });
      return;
    }

    openDialog({
      title: "Adicionar Nova Tarefa",
      description: "Preencha os campos abaixo para adicionar uma nova tarefa.",
      fields: [
        { id: "title", label: "Título", placeholder: "Descrição da tarefa", required: true },
        { 
          id: "priority", 
          label: "Prioridade", 
          placeholder: "Selecione a prioridade",
          options: [
            { value: "alta", label: "Alta" },
            { value: "média", label: "Média" },
            { value: "baixa", label: "Baixa" }
          ]
        },
        { id: "deadline", label: "Prazo", type: "date", required: true },
        { id: "client", label: "Cliente", placeholder: "Nome do cliente" },
        { id: "case", label: "Processo", placeholder: "Número do processo" },
      ],
      submitLabel: "Adicionar Tarefa",
      entityType: "task",
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          
          // Verificar se data é válida
          if (!formData.deadline) {
            throw new Error("É necessário informar um prazo válido");
          }
          
          // Preparar dados para o Supabase
          const taskData = {
            advogado_id: user.id,
            titulo: formData.title,
            prioridade: formData.priority || "média",
            deadline: formData.deadline,
            cliente: formData.client || null,
            processo: formData.case || null,
            completed: false
          };
          
          // Inserir no Supabase
          const { data, error } = await supabase
            .from('tarefas')
            .insert(taskData)
            .select()
            .single();
          
          if (error) throw error;
          
          if (data) {
            // Formatar data para exibição
            let deadline = data.deadline ? parseISO(data.deadline) : new Date();
            let displayDate = "";
            
            if (isToday(deadline)) {
              displayDate = "Hoje";
            } else if (isTomorrow(deadline)) {
              displayDate = "Amanhã";
            } else {
              displayDate = format(deadline, "dd/MM/yyyy", { locale: ptBR });
            }
            
            // Criar objeto de tarefa no formato da aplicação
            const newTask: Task = {
              id: data.id,
              title: data.titulo,
              priority: data.prioridade,
              deadline: data.deadline,
              case: data.processo,
              client: data.cliente,
              completed: false,
              display_date: displayDate
            };
            
            // Adicionar a nova tarefa ao início da lista
            const updatedTasks = [newTask, ...tasks.slice(0, tasks.length > 4 ? 4 : tasks.length)];
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
            
            // Exibir mensagem de sucesso
            toast({
              title: "Tarefa adicionada",
              description: `A tarefa foi adicionada com sucesso`,
            });
          }
        } catch (error: any) {
          console.error("Erro ao adicionar tarefa:", error);
          toast({
            title: "Erro ao adicionar tarefa",
            description: error.message || "Não foi possível adicionar a tarefa",
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
      <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up delay-200">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Tarefas Pendentes</h3>
          </div>
          <div className="flex items-center gap-2">
            {showSearch ? (
              <div className="flex items-center bg-muted rounded-md">
                <Input
                  type="text"
                  placeholder="Buscar tarefa..."
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
                    setFilteredTasks(tasks);
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
                  onClick={handleNewTask}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
            <span className="text-xs text-muted-foreground">Total: {filteredTasks.length}</span>
          </div>
        </div>
        
        <div className="p-2">
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">
              Carregando tarefas...
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-5 w-5 rounded-full p-0 border",
                      item.completed && "bg-primary border-primary"
                    )}
                    onClick={() => toggleTaskCompletion(item.id, item.completed)}
                  >
                    {item.completed && <Check className="h-3 w-3 text-white" />}
                  </Button>
                  <div className="flex flex-col">
                    <h4 className={cn(
                      "text-sm font-medium", 
                      item.completed && "line-through text-muted-foreground"
                    )}>
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority === "alta" ? "Alta" : item.priority === "média" ? "Média" : "Baixa"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.display_date}
                      </span>
                    </div>
                    {(item.client || item.case) && (
                      <div className="flex items-center gap-2 mt-1">
                        {item.client && (
                          <span className="text-xs text-muted-foreground">
                            {item.client}
                          </span>
                        )}
                        {item.case && (
                          <span className="text-xs text-muted-foreground">
                            • {item.case}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Nenhuma tarefa encontrada
            </div>
          )}
        </div>
      </div>

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrar Tarefas</DialogTitle>
            <DialogDescription>
              Selecione os filtros que deseja aplicar à lista de tarefas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <h4 className="text-sm font-medium">Por Prioridade</h4>
            <div className="flex flex-wrap gap-2">
              {["alta", "média", "baixa"].map((priority) => (
                <Button 
                  key={priority}
                  variant={activeFilter === priority ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyFilter(priority)}
                  className="text-xs h-8"
                >
                  {priority === "alta" ? "Alta" : priority === "média" ? "Média" : "Baixa"}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveFilter(null);
                setFilteredTasks(tasks);
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

export default UpcomingTasks;
