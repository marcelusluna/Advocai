import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Plus, Search, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth/auth-provider";
import { supabase } from "@/integrations/supabase/client";
import { CreateEntityContext } from "@/layouts/main-layout";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  date: string;
  created_at?: string;
}

const RecentClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { openDialog } = useContext(CreateEntityContext);
  const { user } = useAuth();

  useEffect(() => {
    fetchClients();
  }, [user]);

  const fetchClients = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let query = supabase.from('clientes').select('*');
      
      if (!user.isAdmin) {
        // Filtra por advogado_id se não for admin
        query = query.eq('advogado_id', user.id);
      }
      
      // Limita aos clientes mais recentes
      const { data, error } = await query.order('created_at', { ascending: false }).limit(5);
      
      if (error) {
        console.error("Erro ao buscar clientes:", error);
        toast({
          title: "Erro ao carregar clientes",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedClients: Client[] = data.map(client => ({
          id: client.id,
          name: client.nome,
          type: client.tipo,
          email: client.email,
          phone: client.telefone,
          date: client.created_at ? `Há ${getRelativeTime(new Date(client.created_at))}` : "Recente",
          created_at: client.created_at
        }));
        
        setClients(mappedClients);
        setFilteredClients(mappedClients);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setFilteredClients(clients);
      return;
    }
    
    const filtered = clients.filter(item => 
      item.name.toLowerCase().includes(term.toLowerCase()) || 
      item.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const applyFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilteredClients(clients);
    } else {
      setActiveFilter(filter);
      const filtered = clients.filter(item => 
        filter === "all" ? true : item.type === filter
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
    if (!user) {
      toast({
        title: "Usuário não autenticado",
        description: "Você precisa estar logado para adicionar clientes.",
        variant: "destructive",
      });
      return;
    }

    openDialog({
      title: "Cadastrar Novo Cliente",
      description: "Preencha os campos abaixo para adicionar um novo cliente.",
      fields: [
        { id: "name", label: "Nome", placeholder: "Nome completo", required: true },
        { id: "email", label: "E-mail", placeholder: "email@exemplo.com", required: true },
        { id: "phone", label: "Telefone", placeholder: "(00) 00000-0000" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Pessoa Física", label: "Pessoa Física" },
            { value: "Pessoa Jurídica", label: "Pessoa Jurídica" }
          ]
        },
        { id: "document", label: "CPF/CNPJ", placeholder: "Somente números" },
        { id: "address", label: "Endereço", placeholder: "Endereço completo" },
      ],
      submitLabel: "Cadastrar Cliente",
      entityType: "client",
      onSubmit: async (formData) => {
        try {
          setIsLoading(true);
          
          // Preparar dados para o Supabase
          const clientData = {
            advogado_id: user.id,
            nome: formData.name,
            email: formData.email,
            telefone: formData.phone || "",
            tipo: formData.type || "Pessoa Física",
            documento: formData.document || "",
            endereco: formData.address || "",
            created_at: new Date().toISOString()
          };
          
          console.log("Enviando dados para o Supabase:", clientData);
          
          // Inserir no Supabase
          const { data, error } = await supabase
            .from('clientes')
            .insert(clientData)
            .select()
            .single();
          
          if (error) {
            console.error("Erro detalhado do Supabase:", error);
            throw error;
          }
          
          if (data) {
            console.log("Cliente cadastrado com sucesso:", data);
            
            // Criar objeto de cliente no formato da aplicação
            const newClient: Client = {
              id: data.id,
              name: data.nome,
              type: data.tipo,
              email: data.email,
              phone: data.telefone,
              date: "Agora",
              created_at: data.created_at
            };
            
            // Adicionar o novo cliente ao início da lista
            const updatedClients = [newClient, ...clients.slice(0, clients.length > 4 ? 4 : clients.length)];
            setClients(updatedClients);
            setFilteredClients(updatedClients);
            
            // Recarregar a lista de clientes para garantir sincronização
            setTimeout(() => {
              fetchClients();
            }, 1000);
            
            // Exibir mensagem de sucesso
            toast({
              title: "Cliente cadastrado",
              description: `${formData.name} foi adicionado com sucesso à sua lista de clientes`,
            });
          }
        } catch (error: any) {
          console.error("Erro ao cadastrar cliente:", error);
          toast({
            title: "Erro ao cadastrar cliente",
            description: error.message || "Não foi possível adicionar o cliente",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Clientes Recentes</CardTitle>
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
                onClick={handleNewClient}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          )}
          <span className="text-xs text-muted-foreground">Total: {filteredClients.length}</span>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Carregando clientes...
          </div>
        ) : filteredClients.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.type === "Pessoa Física" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {client.type}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Nenhum cliente encontrado
          </div>
        )}
      </CardContent>

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrar Clientes</DialogTitle>
            <DialogDescription>
              Selecione os filtros que deseja aplicar à lista de clientes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <h4 className="text-sm font-medium">Por Tipo</h4>
            <div className="flex flex-wrap gap-2">
              {["Pessoa Física", "Pessoa Jurídica"].map((tipo) => (
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
                setFilteredClients(clients);
                setShowFilterDialog(false);
              }}
            >
              Limpar Filtros
            </Button>
            <Button onClick={() => setShowFilterDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RecentClients;
