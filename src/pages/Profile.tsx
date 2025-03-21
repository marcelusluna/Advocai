import React, { useState, useEffect } from "react";
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
import { Camera, Save, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth/auth-provider";
import { supabase } from "@/integrations/supabase/client";
import { saveToStorage, getFromStorage, STORAGE_KEYS } from "@/services/storage-service";

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  oabNumber: string;
  oabState: string;
  oabDate: string;
  oabStatus: string;
}

const Profile = () => {
  const { toast } = useToast();
  const { user, refreshUserData, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ProfileForm>(() => {
    // Carregar dados do localStorage ou usar valores padrão
    const savedForm = getFromStorage<ProfileForm>(STORAGE_KEYS.USER_PROFILE_FORM, {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      bio: '',
      oabNumber: '',
      oabState: '',
      oabDate: '',
      oabStatus: 'Regular'
    });

    // Se o formulário não tiver nome e o usuário estiver disponível,
    // tenta extrair nome e sobrenome do nome completo do usuário
    if (!savedForm.firstName && user?.name) {
      const nameParts = user.name.split(' ');
      savedForm.firstName = nameParts[0] || '';
      savedForm.lastName = nameParts.slice(1).join(' ') || '';
    }

    return savedForm;
  });
  
  // Carregar dados do perfil do usuário
  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);
  
  // Salvar dados do formulário no localStorage quando alterados
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USER_PROFILE_FORM, form);
  }, [form]);

  // Função para buscar dados do perfil no Supabase
  const fetchProfileData = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      
      // Verificar se já existe um perfil para este usuário
      const { data: profileData, error: profileError } = await supabase
        .from('perfil_advogado')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (profileError) {
        console.error("Erro ao buscar perfil:", profileError);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do perfil",
          variant: "destructive"
        });
        return;
      }
      
      if (profileData) {
        // Dividir o nome em primeiro e último nome
        const nameParts = profileData.nome.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Atualizar o formulário com os dados do perfil
        setForm({
          firstName,
          lastName,
          email: profileData.email || user.email || '',
          phone: profileData.telefone || '',
          bio: profileData.bio || '',
          oabNumber: profileData.oab || '',
          oabState: '',  // Extrair do OAB no futuro
          oabDate: '',   // Campo adicional a ser implementado
          oabStatus: 'Regular'
        });
        
        // Salvar no armazenamento local
        saveToStorage(STORAGE_KEYS.USER_PROFILE_FORM, {
          firstName,
          lastName,
          email: profileData.email || user.email || '',
          phone: profileData.telefone || '',
          bio: profileData.bio || '',
          oabNumber: profileData.oab || '',
          oabState: '',
          oabDate: '',
          oabStatus: 'Regular'
        });
      } else {
        // Se não existir perfil, usar dados mínimos do usuário
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setForm({
          firstName,
          lastName,
          email: user.email || '',
          phone: '',
          bio: '',
          oabNumber: '',
          oabState: '',
          oabDate: '',
          oabStatus: 'Regular'
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados do perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar o campo do formulário
  const handleInputChange = (field: keyof ProfileForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para salvar as alterações no perfil
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      
      // Preparar dados do perfil
      const profileData = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        oab: form.oabNumber
      };
      
      // Atualizar perfil usando a função do contexto de autenticação
      await updateUserProfile(profileData);
      
      // Atualizar localStorage
      saveToStorage(STORAGE_KEYS.USER_PROFILE_FORM, form);
      
      toast({
        title: "Perfil salvo",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao salvar perfil:", error);
      toast({
        title: "Erro ao salvar perfil",
        description: error.message || "Não foi possível salvar suas informações",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            <TabsList className="mb-6 flex-wrap">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar seus dados pessoais</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="credentials">Credenciais</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gerenciar dados da OAB e certificações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="security">Segurança</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Configurar senha e opções de segurança</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                      <AvatarFallback className="text-3xl">
                        {form.firstName.charAt(0)}{form.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Camera className="mr-2 h-4 w-4" />
                            Alterar foto
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Selecionar uma nova foto de perfil</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                          <Input 
                            id="firstName" 
                            value={form.firstName} 
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input 
                            id="lastName" 
                            value={form.lastName} 
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={form.email} 
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input 
                            id="phone" 
                            value={form.phone} 
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea 
                            id="bio" 
                            value={form.bio} 
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            className="min-h-[100px]" 
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Salvando...
                                  </>
                                ) : (
                                  <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Salvar alterações
                                  </>
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Salvar todas as alterações feitas</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
                        <Input 
                          id="oabNumber" 
                          value={form.oabNumber} 
                          onChange={(e) => handleInputChange('oabNumber', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabState">Estado OAB</Label>
                        <Input 
                          id="oabState" 
                          value={form.oabState} 
                          onChange={(e) => handleInputChange('oabState', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabDate">Data de Inscrição</Label>
                        <Input 
                          id="oabDate" 
                          type="date" 
                          value={form.oabDate} 
                          onChange={(e) => handleInputChange('oabDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oabStatus">Situação</Label>
                        <Input 
                          id="oabStatus" 
                          value={form.oabStatus} 
                          onChange={(e) => handleInputChange('oabStatus', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Salvando...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" />
                                  Salvar alterações
                                </>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Salvar as credenciais profissionais</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Alteração de senha",
                      description: "Função de alteração de senha será implementada em breve.",
                    });
                  }} className="space-y-6">
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type="submit">
                              <Save className="mr-2 h-4 w-4" />
                              Atualizar senha
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Salvar nova senha e configurações de segurança</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
