
import React, { useState } from "react";
import { Users, Plus, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo para clientes recentes
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
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    type: "Pessoa Física"
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();

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
    setShowNewClientDialog(false);
    
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

  return (
    <>
      <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Clientes Recentes</h3>
          </div>
          <div className="flex items-center gap-2">
            {showSearch ? (
              <div className="flex items-center bg-muted rounded-md">
                <Input
                  type="text"
                  placeholder="Buscar cliente..."
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
                    setFilteredClients(clients);
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
                  onClick={() => setShowNewClientDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
            <span className="text-xs text-muted-foreground">Total: {filteredClients.length}</span>
          </div>
        </div>
        
        <div className="p-2">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div 
                key={client.id} 
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{client.name}</span>
                  <span className="text-xs text-muted-foreground">{client.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{client.date}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    getStatusColor(client.status)
                  )}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>Nenhum cliente encontrado</p>
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
                description: "Você seria redirecionado para a página de todos os clientes."
              });
            }}
          >
            Ver todos os clientes
          </Button>
        </div>
      </div>

      {/* Dialog para novo cliente */}
      <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar um novo cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome</label>
              <Input
                id="name"
                placeholder="Nome do cliente"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                placeholder="email@exemplo.com"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Tipo</label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newClient.type}
                onChange={(e) => setNewClient({...newClient, type: e.target.value})}
              >
                <option>Pessoa Física</option>
                <option>Pessoa Jurídica</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewClientDialog(false)}>Cancelar</Button>
            <Button onClick={addNewClient}>Adicionar Cliente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para filtros */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
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
