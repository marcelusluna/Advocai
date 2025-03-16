
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil salvo",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  return (
    <MainLayout>
      <div className="py-6">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Meu Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e profissionais
            </p>
          </div>

          <Tabs defaultValue="info">
            <TabsList className="mb-6">
              <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="credentials">Credenciais</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-3 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Foto de Perfil</CardTitle>
                    <CardDescription>Esta foto será exibida em seu perfil e documentos.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="" alt="Foto do perfil" />
                      <AvatarFallback className="text-3xl">JD</AvatarFallback>
                    </Avatar>
                    
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Alterar foto
                    </Button>
                  </CardContent>
                </Card>

                <Card className="col-span-3 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Informações Básicas</CardTitle>
                    <CardDescription>Atualize seus dados pessoais e de contato.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <Input id="firstName" defaultValue="João" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input id="lastName" defaultValue="da Silva" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="joao.silva@exemplo.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" defaultValue="(11) 99999-8888" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea id="bio" defaultValue="Advogado especializado em Direito Civil e Empresarial, com mais de 10 anos de experiência." className="min-h-[100px]" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-end">
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" />
                          Salvar alterações
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="credentials">
              <Card>
                <CardHeader>
                  <CardTitle>Credenciais Profissionais</CardTitle>
                  <CardDescription>Mantenha seus dados da OAB e certificações atualizados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="oabNumber">Número OAB</Label>
                        <Input id="oabNumber" defaultValue="123456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabState">Estado OAB</Label>
                        <Input id="oabState" defaultValue="SP" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabDate">Data de Inscrição</Label>
                        <Input id="oabDate" type="date" defaultValue="2010-06-15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabStatus">Situação</Label>
                        <Input id="oabStatus" defaultValue="Regular" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar alterações
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Gerencie sua senha e configurações de segurança.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="md:col-span-2">
                        <Separator className="my-4" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Atualizar senha
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Profile;
