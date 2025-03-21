import React, { useState, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight, Clock, Calendar, Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth/auth-provider";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Interface para tipagem das notificações
interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "alert" | "warning" | "success";
  date: string;
  read: boolean;
  created_at?: string;
}

// Interface para tipagem dos compromissos
interface Commitment {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  type: string;
  completed: boolean;
  created_at?: string;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <Bell className="h-4 w-4 text-red-500" />;
    case "warning":
      return <Info className="h-4 w-4 text-amber-500" />;
    case "success":
      return <Check className="h-4 w-4 text-green-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const NotificationsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (activeTab === "notifications") {
      fetchNotifications();
    } else {
      fetchCommitments();
    }
  }, [activeTab, user]);

  // Função para buscar notificações no Supabase
  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let query = supabase.from('notificacoes').select('*');
      
      if (!user.isAdmin) {
        // Filtra por advogado_id se não for admin
        query = query.eq('advogado_id', user.id);
      }
      
      // Busca as notificações mais recentes
      const { data, error } = await query.order('created_at', { ascending: false }).limit(5);
      
      if (error) {
        console.error("Erro ao buscar notificações:", error);
        toast({
          title: "Erro ao carregar notificações",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedNotifications: Notification[] = data.map(notif => {
          // Formatar data para exibição
          let created = notif.created_at ? parseISO(notif.created_at) : new Date();
          let displayDate = "";
          
          if (isToday(created)) {
            displayDate = "Hoje";
          } else if (isTomorrow(created)) {
            displayDate = "Ontem";
          } else {
            displayDate = format(created, "dd/MM/yyyy", { locale: ptBR });
          }
          
          return {
            id: notif.id,
            title: notif.titulo,
            description: notif.descricao,
            type: notif.tipo || "info",
            date: displayDate,
            read: !!notif.lida,
            created_at: notif.created_at
          };
        });
        
        setNotifications(mappedNotifications);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar compromissos no Supabase
  const fetchCommitments = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let query = supabase.from('compromissos').select('*');
      
      if (!user.isAdmin) {
        // Filtra por advogado_id se não for admin
        query = query.eq('advogado_id', user.id);
      }
      
      // Busca os compromissos mais próximos
      const { data, error } = await query.order('data', { ascending: true }).limit(5);
      
      if (error) {
        console.error("Erro ao buscar compromissos:", error);
        toast({
          title: "Erro ao carregar compromissos",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedCommitments: Commitment[] = data.map(commit => {
          // Formatar data para exibição
          let date = commit.data ? parseISO(commit.data) : new Date();
          let displayDate = "";
          
          if (isToday(date)) {
            displayDate = "Hoje";
          } else if (isTomorrow(date)) {
            displayDate = "Amanhã";
          } else {
            displayDate = format(date, "dd/MM/yyyy", { locale: ptBR });
          }
          
          return {
            id: commit.id,
            title: commit.titulo,
            description: commit.descricao,
            date: displayDate,
            time: commit.hora || "00:00",
            type: commit.tipo || "Reunião",
            completed: !!commit.concluido,
            created_at: commit.created_at
          };
        });
        
        setCommitments(mappedCommitments);
      }
    } catch (error) {
      console.error("Erro ao buscar compromissos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const marcarComoLida = async (notificationId: string) => {
    try {
      setIsLoading(true);
      
      // Atualizar no Supabase
      const { error } = await supabase
        .from('notificacoes')
        .update({ lida: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      
      // Atualizar estado local
      const updatedNotifications = notifications.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      );
      
      setNotifications(updatedNotifications);
      
      toast({
        title: "Notificação marcada como lida",
        description: "A notificação foi atualizada com sucesso."
      });
    } catch (error: any) {
      console.error("Erro ao marcar notificação como lida:", error);
      toast({
        title: "Erro ao atualizar notificação",
        description: error.message || "Não foi possível marcar a notificação como lida",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removerNotificacao = async (notificationId: string) => {
    try {
      setIsLoading(true);
      
      // Remover do Supabase
      const { error } = await supabase
        .from('notificacoes')
        .delete()
        .eq('id', notificationId);
      
      if (error) throw error;
      
      // Atualizar estado local
      const updatedNotifications = notifications.filter(
        notification => notification.id !== notificationId
      );
      
      setNotifications(updatedNotifications);
      
      toast({
        title: "Notificação removida",
        description: "A notificação foi removida com sucesso."
      });
    } catch (error: any) {
      console.error("Erro ao remover notificação:", error);
      toast({
        title: "Erro ao remover notificação",
        description: error.message || "Não foi possível remover a notificação",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const marcarComoConcluido = async (commitmentId: string, completed: boolean) => {
    try {
      setIsLoading(true);
      
      // Atualizar no Supabase
      const { error } = await supabase
        .from('compromissos')
        .update({ concluido: !completed })
        .eq('id', commitmentId);
      
      if (error) throw error;
      
      // Atualizar estado local
      const updatedCommitments = commitments.map(commitment => 
        commitment.id === commitmentId ? { ...commitment, completed: !completed } : commitment
      );
      
      setCommitments(updatedCommitments);
      
      toast({
        title: completed ? "Compromisso reaberto" : "Compromisso concluído",
        description: `O compromisso foi marcado como ${completed ? "não concluído" : "concluído"}.`
      });
    } catch (error: any) {
      console.error("Erro ao atualizar compromisso:", error);
      toast({
        title: "Erro ao atualizar compromisso",
        description: error.message || "Não foi possível atualizar o status do compromisso",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removerCompromisso = async (commitmentId: string) => {
    try {
      setIsLoading(true);
      
      // Remover do Supabase
      const { error } = await supabase
        .from('compromissos')
        .delete()
        .eq('id', commitmentId);
      
      if (error) throw error;
      
      // Atualizar estado local
      const updatedCommitments = commitments.filter(
        commitment => commitment.id !== commitmentId
      );
      
      setCommitments(updatedCommitments);
      
      toast({
        title: "Compromisso removido",
        description: "O compromisso foi removido com sucesso."
      });
    } catch (error: any) {
      console.error("Erro ao remover compromisso:", error);
      toast({
        title: "Erro ao remover compromisso",
        description: error.message || "Não foi possível remover o compromisso",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up delay-400">
      <Tabs defaultValue="notifications" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="notifications" className="text-xs">Notificações</TabsTrigger>
            <TabsTrigger value="commitments" className="text-xs">Compromissos</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (activeTab === "notifications") {
                  fetchNotifications();
                } else {
                  fetchCommitments();
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (activeTab === "notifications") {
                  fetchNotifications();
                } else {
                  fetchCommitments();
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="notifications" className="p-0 m-0">
          <div className="p-2">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">
                Carregando notificações...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex items-start justify-between p-3 hover:bg-muted/50 rounded-md transition-colors",
                    !item.read && "bg-primary/5 border-l-2 border-primary"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getNotificationIcon(item.type)}</div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <span className="text-xs text-muted-foreground mt-1">{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!item.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => marcarComoLida(item.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => removerNotificacao(item.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Nenhuma notificação encontrada
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="commitments" className="p-0 m-0">
          <div className="p-2">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">
                Carregando compromissos...
              </div>
            ) : commitments.length > 0 ? (
              commitments.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex items-start justify-between p-3 hover:bg-muted/50 rounded-md transition-colors",
                    item.completed && "opacity-70"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className={cn(
                        "text-sm font-medium",
                        item.completed && "line-through text-muted-foreground"
                      )}>
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {item.date}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => marcarComoConcluido(item.id, item.completed)}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => removerCompromisso(item.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Nenhum compromisso encontrado
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPanel;
