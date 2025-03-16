
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Save, Users, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Office = () => {
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Informações salvas",
      description: "Os dados do escritório foram atualizados com sucesso.",
    });
  };

  return (
    <MainLayout>
      <div className="py-6">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Meu Escritório</h1>
            <p className="text-muted-foreground">
              Gerencie as informações do seu escritório de advocacia
            </p>
          </div>

          <Tabs defaultValue="info">
            <TabsList className="mb-6 flex-wrap">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="info">Informações Básicas</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dados principais do escritório</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="address">Endereço</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Localização e endereço físico</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="members">Equipe</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Membros e colaboradores</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Escritório</CardTitle>
                  <CardDescription>Informações gerais sobre seu escritório de advocacia.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="firmName">Nome do Escritório</Label>
                        <Input id="firmName" defaultValue="Silva & Associados Advocacia" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">CNPJ</Label>
                        <Input id="taxId" defaultValue="12.345.678/0001-90" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabFirmNumber">Número OAB do Escritório</Label>
                        <Input id="oabFirmNumber" defaultValue="9876/SP" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue="(11) 3333-4444" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="contato@silvaassociados.com.br" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" type="url" defaultValue="https://www.silvaassociados.com.br" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea 
                          id="description" 
                          className="min-h-[100px]"
                          defaultValue="Escritório especializado em Direito Civil, Empresarial e Trabalhista, atendendo clientes em todo o Brasil desde 2005."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="areas">Áreas de Atuação</Label>
                        <Textarea 
                          id="areas" 
                          className="min-h-[100px]"
                          defaultValue="Direito Civil, Direito Empresarial, Direito Trabalhista, Direito Tributário, Direito de Família"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type="submit">
                              <Save className="mr-2 h-4 w-4" />
                              Salvar alterações
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Salvar informações do escritório</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>Endereço e localização do escritório.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="street">Rua</Label>
                        <Input id="street" defaultValue="Av. Paulista" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input id="number" defaultValue="1000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input id="complement" defaultValue="Conjunto 1010" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" defaultValue="Bela Vista" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" defaultValue="São Paulo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" defaultValue="SP" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input id="zipCode" defaultValue="01310-100" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type="submit">
                              <Save className="mr-2 h-4 w-4" />
                              Salvar alterações
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Salvar informações de endereço</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Equipe do Escritório</CardTitle>
                  <CardDescription>Membros e colaboradores do escritório.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Total de 5 membros cadastrados</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm">
                            <Users className="mr-2 h-4 w-4" />
                            Adicionar Membro
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cadastrar novo membro na equipe</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {["João da Silva", "Maria Oliveira", "Carlos Santos", "Ana Ferreira", "Paulo Mendes"].map((member, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {member.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-medium">{member}</p>
                              <p className="text-xs text-muted-foreground">
                                {index === 0 ? "Sócio Principal" : 
                                 index === 1 ? "Sócia" : 
                                 index === 2 ? "Advogado Associado" : 
                                 index === 3 ? "Advogada Associada" : 
                                 "Estagiário"}
                              </p>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Editar informações do membro</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Office;
