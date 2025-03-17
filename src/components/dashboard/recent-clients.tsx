
import React, { useState, useContext } from "react";
import { Users, Plus, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateEntityContext } from "@/layouts/main-layout";

const initialClientsData = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    type: "Pessoa Física",
    date: "Há 2 dias",
    status: "ativo"
  },
  {
    id: "2",
    name: "Tech Solutions Ltda.",
    email: "contato@techsolutions.com",
    type: "Pessoa Jurídica",
    date: "Há 4 dias",
    status: "ativo"
  },
  {
    id: "3",
    name: "João Pereira",
    email: "joao.pereira@example.com",
    type: "Pessoa Física",
    date: "Há 1 semana",
    status: "pendente"
  },
  {
    id: "4",
    name: "Construções Rápidas S.A.",
    email: "contato@construcoesrapidas.com",
    type: "Pessoa Jurídica",
    date: "Há 2 semanas",
    status: "ativo"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "inativo":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const RecentClients: React.FC = () => {
  const [clients, setClients] = useState(initialClientsData);
  const [filteredClients, setFilteredClients] = useState(initialClientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    type: "Pessoa Física"
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { openDialog } = useContext(CreateEntityContext);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredClients(clients);
      return;
    }
    
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(term.toLowerCase()) || 
      client.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const addNewClient = () => {
    if (!newClient.name || !newClient.email) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newClientData = {
      id: (clients.length + 1).toString(),
      name: newClient.name,
      email: newClient.email,
      type: newClient.type,
      date: "Agora",
      status: "ativo"
    };

    const updatedClients = [newClientData, ...clients];
    setClients(updatedClients);
    setFilteredClients(updatedClients);
    setNewClient({ name: "", email: "", type: "Pessoa Física" });
    
    toast({
      title: "Cliente adicionado",
      description: `${newClient.name} foi adicionado com sucesso.`
    });
  };

  const applyFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilteredClients(clients);
    } else {
      setActiveFilter(filter);
      const filtered = clients.filter(client => 
        filter === "all" ? true : client.status === filter || client.type === filter
      );
      setFilteredClients(filtered);
    }
    setShowFilterDialog(false);
    
    toast({
      title: "Filtro aplicado",
      description: `Lista filtrada com sucesso.`
    });
  };

  const handleNewClient = () => {
    openDialog({
      title: "Adicionar Novo Cliente",
      description: "Preencha os campos abaixo para adicionar um novo cliente.",
      fields: [
        { id: "name", label: "Nome", placeholder: "Nome do cliente" },
        { id: "email", label: "Email", placeholder: "email@exemplo.com", type: "email" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Pessoa Física", label: "Pessoa Física" },
            { value: "Pessoa Jurídica", label: "Pessoa Jurídica" }
          ]
        },
      ],
      submitLabel: "Adicionar Cliente",
      entityType: "client"
    });
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm">Clientes Recentes</h3>
          </div>
          <div className="flex items-center gap-1">
            {showSearch ? (
              <div className="flex items-center bg-muted rounded-md w-36 sm:w-48">
                <Input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-7 text-xs border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => {
                    setShowSearch(false);
                    setSearchTerm("");
                    setFilteredClients(clients);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-7 w-7",
                    activeFilter && "text-primary bg-primary/10"
                  )}
                  onClick={() => setShowFilterDialog(true)}
                >
                  <Filter className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={handleNewClient}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </>
            )}
            <span className="text-xs text-muted-foreground hidden sm:inline-block ml-1">{filteredClients.length}</span>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-grow" style={{ maxHeight: "210px" }}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div 
                key={client.id} 
                className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/50 transition-colors cursor-pointer border-b border-gray-50 last:border-b-0"
              >
                <div className="flex flex-col min-w-0 mr-2">
                  <span className="font-medium text-sm truncate max-w-[150px] sm:max-w-[200px]" title={client.name}>
                    {client.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-[200px]" title={client.email}>
                    {client.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{client.date}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full border whitespace-nowrap",
                    getStatusColor(client.status)
                  )}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              <p>Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
        
        <div className="p-2 border-t border-border mt-auto">
          <Button 
            variant="link" 
            className="text-xs text-primary hover:text-primary/80 transition-colors w-full text-center h-auto py-1"
            onClick={() => {
              toast({
                title: "Redirecionando",
                description: "Você seria redirecionado para a página de todos os clientes."
              });
            }}
          >
            Ver todos os clientes
          </Button>
        </div>
      </div>

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Filtrar Clientes</DialogTitle>
            <DialogDescription>
              Selecione os critérios para filtrar a lista de clientes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === "ativo" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("ativo")}
                >
                  Ativo
                </Button>
                <Button 
                  variant={activeFilter === "pendente" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("pendente")}
                >
                  Pendente
                </Button>
                <Button 
                  variant={activeFilter === "inativo" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("inativo")}
                >
                  Inativo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Tipo</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === "Pessoa Física" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Pessoa Física")}
                >
                  Pessoa Física
                </Button>
                <Button 
                  variant={activeFilter === "Pessoa Jurídica" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => applyFilter("Pessoa Jurídica")}
                >
                  Pessoa Jurídica
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveFilter(null);
                setFilteredClients(clients);
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

export default RecentClients;
