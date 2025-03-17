
import React, { useState } from "react";
import { Bell, Calendar, CircleAlert, X, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Dados fictícios para notificações
const notificacoesData = [
  {
    id: "1",
    tipo: "prazo",
    titulo: "Prazo Recursal - Processo nº 0001234-12.2023.8.26.0100",
    descricao: "O prazo para recurso vence em 2 dias",
    data: "28/07/2023",
    urgencia: "alta",
    lida: false
  },
  {
    id: "2",
    tipo: "audiencia",
    titulo: "Audiência - Maria Silva",
    descricao: "Audiência de instrução e julgamento marcada",
    data: "30/07/2023",
    hora: "14:30",
    urgencia: "media",
    lida: false
  },
  {
    id: "3",
    tipo: "prazo",
    titulo: "Prazo - Contestação",
    descricao: "Prazo para contestação no processo nº 0002345-23.2023.8.26.0100",
    data: "02/08/2023",
    urgencia: "alta",
    lida: true
  },
  {
    id: "4",
    tipo: "compromisso",
    titulo: "Reunião com cliente",
    descricao: "Reunião com João Pereira para discussão do caso",
    data: "05/08/2023",
    hora: "10:00",
    urgencia: "baixa",
    lida: false
  },
];

const compromissosData = [
  {
    id: "1",
    titulo: "Audiência de Conciliação",
    cliente: "Maria Silva",
    processo: "0001234-12.2023.8.26.0100",
    data: "28/07/2023",
    hora: "14:30",
    local: "Fórum Central"
  },
  {
    id: "2",
    titulo: "Reunião com cliente",
    cliente: "Tech Solutions Ltda.",
    data: "01/08/2023",
    hora: "10:00",
    local: "Escritório"
  },
  {
    id: "3",
    titulo: "Depoimento Testemunha",
    cliente: "João Pereira",
    processo: "0003456-34.2023.8.26.0100",
    data: "03/08/2023",
    hora: "09:00",
    local: "Fórum Trabalhista"
  }
];

const getUrgenciaStyle = (urgencia: string) => {
  switch (urgencia) {
    case "alta":
      return "bg-red-100 text-red-800 border-red-200";
    case "media":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "baixa":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const NotificationsPanel: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState(notificacoesData);
  const [compromissos, setCompromissos] = useState(compromissosData);
  const { toast } = useToast();

  const marcarComoLida = (id: string) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, lida: true } : notif
      )
    );
    
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida com sucesso.",
    });
  };

  const removerNotificacao = (id: string) => {
    setNotificacoes(prev => prev.filter(notif => notif.id !== id));
    
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso.",
    });
  };

  const removerCompromisso = (id: string) => {
    setCompromissos(prev => prev.filter(comp => comp.id !== id));
    
    toast({
      title: "Compromisso removido",
      description: "O compromisso foi removido com sucesso.",
    });
  };

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <Card className="animate-fade-in delay-200 w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Central de Notificações</CardTitle>
          </div>
          {naoLidas > 0 && (
            <div className="bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
              {naoLidas}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="notificacoes" className="w-full">
          <TabsList className="w-full mb-2 px-4 pt-2">
            <TabsTrigger value="notificacoes" className="flex-1">Notificações</TabsTrigger>
            <TabsTrigger value="compromissos" className="flex-1">Compromissos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notificacoes" className="mt-0 px-4">
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {notificacoes.length > 0 ? (
                notificacoes.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={cn(
                      "relative flex items-start p-3 rounded-md border",
                      notif.lida ? "bg-muted/30 border-border/50" : "bg-card border-border"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                        <h4 className={cn(
                          "text-sm font-medium truncate max-w-[calc(100%-80px)]",
                          notif.lida ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {notif.titulo}
                        </h4>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full border shrink-0",
                          getUrgenciaStyle(notif.urgencia)
                        )}>
                          {notif.urgencia.charAt(0).toUpperCase() + notif.urgencia.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 break-words">{notif.descricao}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {notif.tipo === "prazo" && <CircleAlert className="h-3 w-3 mr-1 text-red-500 shrink-0" />}
                        {notif.tipo === "audiencia" && <Calendar className="h-3 w-3 mr-1 text-blue-500 shrink-0" />}
                        {notif.tipo === "compromisso" && <Clock className="h-3 w-3 mr-1 text-green-500 shrink-0" />}
                        <span>{notif.data}</span>
                        {notif.hora && <span className="ml-1">às {notif.hora}</span>}
                      </div>
                      <div className="flex items-center mt-2 gap-2 flex-wrap">
                        {!notif.lida && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => marcarComoLida(notif.id)}
                            className="h-7 text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" /> Marcar como lida
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removerNotificacao(notif.id)}
                          className="h-7 text-xs text-muted-foreground"
                        >
                          <X className="h-3 w-3 mr-1" /> Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Não há notificações para exibir</p>
                </div>
              )}
            </div>
            <div className="mt-3 text-center py-2 px-1">
              <Button variant="outline" className="w-full">Ver todas as notificações</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="compromissos" className="mt-0 px-4">
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {compromissos.length > 0 ? (
                compromissos.map((comp) => (
                  <div 
                    key={comp.id} 
                    className="relative flex items-start p-3 rounded-md border bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium truncate">{comp.titulo}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 break-words">Cliente: {comp.cliente}</p>
                      {comp.processo && (
                        <p className="text-xs text-muted-foreground mb-1 break-words">Processo: {comp.processo}</p>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1 shrink-0" />
                        <span>{comp.data} às {comp.hora}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Local: {comp.local}</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removerCompromisso(comp.id)}
                          className="h-7 text-xs text-muted-foreground"
                        >
                          <X className="h-3 w-3 mr-1" /> Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Não há compromissos para exibir</p>
                </div>
              )}
            </div>
            <div className="mt-3 text-center py-2 px-1">
              <Button variant="outline" className="w-full">Ver todos os compromissos</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
