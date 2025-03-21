import React, { useState, useEffect } from "react";
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
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth/auth-provider";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
}

const RecentClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchRecentClients();
  }, [user]);

  const fetchRecentClients = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let query = supabase.from('clientes').select('*');
      
      if (!user.isAdmin) {
        // Filtra por advogado_id se não for admin
        query = query.eq('advogado_id', user.id);
      }
      
      // Limita a 5 clientes mais recentes
      const { data, error } = await query.order('created_at', { ascending: false }).limit(5);
      
      if (error) {
        console.error("Erro ao buscar clientes recentes:", error);
        toast({
          title: "Erro ao carregar clientes",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const mappedClients = data.map(client => ({
          id: client.id,
          name: client.nome,
          email: client.email || "",
          phone: client.telefone || "",
          status: client.status || "active" as "active" | "pending" | "inactive"
        }));
        setClients(mappedClients);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewClient = async () => {
    if (!user) {
      toast({
        title: "Usuário não autenticado",
        description: "Você precisa estar logado para adicionar clientes.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newClientData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe o nome do cliente.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Preparar dados para o Supabase
      const clientData = {
        advogado_id: user.id,
        nome: newClientData.name,
        email: newClientData.email || null,
        telefone: newClientData.phone || null,
        status: "active"
      };
      
      // Inserir no Supabase
      const { data, error } = await supabase
        .from('clientes')
        .insert(clientData)
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        // Adicionar o novo cliente à lista local
        const newClient: Client = {
          id: data.id,
          name: data.nome,
          email: data.email || "",
          phone: data.telefone || "",
          status: "active",
        };
        
        setClients([newClient, ...clients.slice(0, 4)]); // Mantém apenas os 5 mais recentes
        setIsDialogOpen(false);
        setNewClientData({ name: "", email: "", phone: "" });
        
        toast({
          title: "Cliente adicionado",
          description: `${newClientData.name} foi adicionado com sucesso à sua lista de clientes.`,
        });
      }
    } catch (error: any) {
      console.error("Erro ao adicionar cliente:", error);
      toast({
        title: "Erro ao adicionar cliente",
        description: error.message || "Não foi possível adicionar o cliente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClientData({
      ...newClientData,
      [name]: value,
    });
  };

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Clientes Recentes</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 recent-clients-add-button" 
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Adicionar</span>
        </Button>
      </CardHeader>
      <CardContent>
        {clients.length > 0 ? (
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
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : client.status === "pending" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {client.status === "active" 
                        ? "Ativo" 
                        : client.status === "pending" 
                        ? "Pendente" 
                        : "Inativo"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            {isLoading ? "Carregando clientes..." : "Nenhum cliente cadastrado ainda."}
          </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados do cliente para adicionar à sua lista.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome *</Label>
              <Input 
                id="name" 
                name="name" 
                value={newClientData.name} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={newClientData.email} 
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={newClientData.phone} 
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" onClick={addNewClient} disabled={isLoading}>
              {isLoading ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RecentClients;
