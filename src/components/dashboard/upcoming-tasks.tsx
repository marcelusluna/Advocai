
import React, { useState } from "react";
import { Calendar, Check, Plus, Search, Filter, X, Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo para tarefas próximas
const initialTasksData = [
  {
    id: "1",
    title: "Audiência - Maria Silva",
    description: "Processo nº 0001234-12.2023.8.26.0100",
    date: "Hoje, 14:30",
    priority: "alta",
    completed: false
  },
  {
    id: "2",
    title: "Prazo - Contestação",
    description: "Processo nº 0002345-23.2023.8.26.0100",
    date: "Amanhã, 23:59",
    priority: "alta",
    completed: false
  },
  {
    id: "3",
    title: "Reunião - João Pereira",
    description: "Discussão de estratégia para o caso",
    date: "28/07/2023, 10:00",
    priority: "média",
    completed: false
  },
  {
    id: "4",
    title: "Revisão - Contrato Tech Solutions",
    description: "Análise final de contrato de prestação de serviços",
    date: "30/07/2023, 18:00",
    priority: "baixa",
    completed: false
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta":
      return "bg-red-100 text-red-800 border-red-200";
    case "média":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "baixa":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const UpcomingTasks: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasksData);
  const [filteredTasks, setFilteredTasks] = useState(initialTasksData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    priority: "média"
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredTasks(tasks);
      return;
    }
    
    const filtered = tasks.filter(task => 
      task.title.toLowerCase().includes(term.toLowerCase()) || 
      task.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(
      searchTerm 
        ? updatedTasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : updatedTasks
    );
    
    const task = tasks.find(t => t.id === id);
    toast({
      title: task?.completed ? "Tarefa reaberta" : "Tarefa concluída",
      description: `A tarefa "${task?.title}" foi ${task?.completed ? "reaberta" : "marcada como concluída"}.`
    });
  };

  const addNewTask = () => {
    if (!newTask.title || !newTask.date) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const formattedDate = newTask.time 
      ? `${newTask.date}, ${newTask.time}` 
      : newTask.date;

    const newTaskData = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      date: formattedDate,
      priority: newTask.priority,
      completed: false
    };

    const updatedTasks = [newTaskData, ...tasks];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setNewTask({
      title: "",
      description: "",
      date: "",
      time: "",
      priority: "média"
    });
    setShowNewTaskDialog(false);
    
    toast({
      title: "Tarefa adicionada",
      description: `A tarefa "${newTask.title}" foi adicionada com sucesso.`
    });
  };

  const applyFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilteredTasks(tasks);
    } else {
      setActiveFilter(filter);
      let filtered;
      
      if (filter === "completed") {
        filtered = tasks.filter(task => task.completed);
      } else if (filter === "pending") {
        filtered = tasks.filter(task => !task.completed);
      } else {
        filtered = tasks.filter(task => task.priority === filter);
      }
      
      setFilteredTasks(filtered);
    }
    setShowFilterDialog(false);
    
    toast({
      title: "Filtro aplicado",
      description: `Lista filtrada com sucesso.`
    });
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up delay-200">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Tarefas Próximas</h3>
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
                  onClick={() => setShowNewTaskDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
            <span className="text-xs text-muted-foreground">Total: {filteredTasks.length}</span>
          </div>
        </div>
        
        <div className="p-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-start justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer",
                  task.completed && "opacity-70"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <button 
                      className={cn(
                        "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
                        task.completed 
                          ? "bg-primary border-primary hover:bg-primary/90 hover:border-primary/90"
                          : "border-muted-foreground/30 hover:bg-primary/10"
                      )}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      <Check className={cn(
                        "h-3 w-3",
                        task.completed ? "text-white" : "text-transparent hover:text-primary"
                      )} />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <span className={cn(
                      "font-medium",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </span>
                    <span className={cn(
                      "text-xs text-muted-foreground",
                      task.completed && "line-through"
                    )}>
                      {task.description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{task.date}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    getPriorityColor(task.priority)
                  )}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>Nenhuma tarefa encontrada</p>
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
                description: "Você seria redirecionado para a página de todas as tarefas."
              });
            }}
          >
            Ver todas as tarefas
          </Button>
        </div>
      </div>

      {/* Dialog para nova tarefa */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar uma nova tarefa.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Título</label>
              <Input
                id="title"
                placeholder="Título da tarefa"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input
                id="description"
                placeholder="Descrição da tarefa"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Data</label>
                <Input
                  id="date"
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">Hora</label>
                <Input
                  id="time"
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">Prioridade</label>
              <select
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>Cancelar</Button>
            <Button onClick={addNewTask}>Adicionar Tarefa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para filtros */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrar Tarefas</DialogTitle>
            <DialogDescription>
              Selecione os critérios para filtrar a lista de tarefas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === "completed" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("completed")}
                >
                  Concluídas
                </Button>
                <Button 
                  variant={activeFilter === "pending" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("pending")}
                >
                  Pendentes
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Prioridade</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === "alta" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("alta")}
                >
                  Alta
                </Button>
                <Button 
                  variant={activeFilter === "média" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("média")}
                >
                  Média
                </Button>
                <Button 
                  variant={activeFilter === "baixa" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("baixa")}
                >
                  Baixa
                </Button>
              </div>
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
            <Button onClick={() => setShowFilterDialog(false)}>Aplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpcomingTasks;
