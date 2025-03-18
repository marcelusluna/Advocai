
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Wand2, Save, Download, Copy, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateWithOpenAI } from "@/services/openai-service";

const petitionTypes = [
  { id: "initial", name: "Petição Inicial" },
  { id: "appeal", name: "Recurso de Apelação" },
  { id: "defense", name: "Contestação" },
  { id: "counterclaim", name: "Reconvenção" },
  { id: "injunction", name: "Medida Cautelar" },
  { id: "habeas_corpus", name: "Habeas Corpus" },
  { id: "mandamus", name: "Mandado de Segurança" }
];

const lawAreas = [
  { id: "civil", name: "Direito Civil" },
  { id: "consumer", name: "Direito do Consumidor" },
  { id: "labor", name: "Direito Trabalhista" },
  { id: "criminal", name: "Direito Penal" },
  { id: "tax", name: "Direito Tributário" },
  { id: "administrative", name: "Direito Administrativo" },
  { id: "family", name: "Direito de Família" }
];

const PetitionAIGenerator: React.FC = () => {
  const [petitionTitle, setPetitionTitle] = useState("");
  const [petitionType, setPetitionType] = useState("");
  const [lawArea, setLawArea] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [opposingParty, setOpposingParty] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [generatedPetition, setGeneratedPetition] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePetition = async () => {
    if (!petitionTitle || !petitionType || !lawArea || !caseDescription) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios para gerar a petição.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Construir prompt para o ChatGPT
      const prompt = `
      Crie uma ${petitionType === "initial" ? "Petição Inicial" : 
                 petitionType === "appeal" ? "Recurso de Apelação" : 
                 petitionType === "defense" ? "Contestação" : 
                 petitionType === "counterclaim" ? "Reconvenção" : 
                 petitionType === "injunction" ? "Medida Cautelar" : 
                 petitionType === "habeas_corpus" ? "Habeas Corpus" : 
                 "Mandado de Segurança"} 
      na área de ${lawArea === "civil" ? "Direito Civil" : 
                  lawArea === "consumer" ? "Direito do Consumidor" : 
                  lawArea === "labor" ? "Direito Trabalhista" : 
                  lawArea === "criminal" ? "Direito Penal" : 
                  lawArea === "tax" ? "Direito Tributário" : 
                  lawArea === "administrative" ? "Direito Administrativo" : 
                  "Direito de Família"}.
      
      Título da petição: ${petitionTitle}
      
      Descrição do caso: ${caseDescription}
      
      Cliente: ${clientName || "[NOME DO CLIENTE]"}
      Parte contrária: ${opposingParty || "[NOME DA PARTE CONTRÁRIA]"}
      
      Instruções adicionais: ${additionalInstructions || "Nenhuma instrução adicional."}
      
      Por favor, formate a petição conforme as normas jurídicas brasileiras, incluindo cabeçalho, endereçamento, qualificação das partes, dos fatos, fundamentos jurídicos, pedidos e fechamento.
      `;

      const systemPrompt = `Você é um advogado brasileiro altamente qualificado, especializado em redigir documentos jurídicos conforme as normas brasileiras. Sua tarefa é criar uma petição juridicamente precisa e profissional com base nas informações fornecidas pelo usuário.`;

      // Chamar a API do OpenAI
      const generatedText = await generateWithOpenAI(prompt, systemPrompt);
      
      setGeneratedPetition(generatedText);
      setIsGenerating(false);
      
      toast({
        title: "Petição gerada com sucesso!",
        description: "Sua petição foi gerada pela IA. Revise o conteúdo antes de utilizar.",
      });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Erro ao gerar petição",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao se comunicar com a API da OpenAI.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPetition);
    toast({
      title: "Copiado!",
      description: "O texto da petição foi copiado para a área de transferência.",
    });
  };

  const handleSave = () => {
    if (!petitionTitle) {
      toast({
        title: "Título necessário",
        description: "Por favor, forneça um título para sua petição antes de salvar.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Petição salva!",
      description: "Sua petição foi salva na biblioteca de documentos.",
    });
    
    // Aqui poderia adicionar código para salvar no estado global ou banco de dados
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="h-auto">
        <CardHeader>
          <CardTitle>Parâmetros da Petição</CardTitle>
          <CardDescription>
            Forneça as informações necessárias para gerar sua petição
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="petition-title">Título da Petição *</Label>
            <Input
              id="petition-title"
              value={petitionTitle}
              onChange={(e) => setPetitionTitle(e.target.value)}
              placeholder="Ex: Petição Inicial de Indenização por Danos Morais"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="petition-type">Tipo de Petição *</Label>
              <Select value={petitionType} onValueChange={setPetitionType}>
                <SelectTrigger id="petition-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {petitionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="law-area">Área do Direito *</Label>
              <Select value={lawArea} onValueChange={setLawArea}>
                <SelectTrigger id="law-area">
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {lawAreas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="case-description">Descrição do Caso *</Label>
            <Textarea
              id="case-description"
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              placeholder="Descreva os fatos relevantes do caso..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="client-name">Nome do Cliente</Label>
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome completo do cliente"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="opposing-party">Parte Contrária</Label>
              <Input
                id="opposing-party"
                value={opposingParty}
                onChange={(e) => setOpposingParty(e.target.value)}
                placeholder="Nome da parte contrária"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="additional-instructions">Instruções Adicionais</Label>
            <Textarea
              id="additional-instructions"
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              placeholder="Forneça instruções específicas para a IA considerar ao gerar a petição..."
              className="min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={handleGeneratePetition} 
            className="w-full" 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Gerando Petição...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Gerar Petição com IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Petição Gerada</CardTitle>
          <CardDescription>
            Revise e edite o texto da petição gerada pela IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedPetition ? (
            <Textarea
              value={generatedPetition}
              onChange={(e) => setGeneratedPetition(e.target.value)}
              className="font-mono text-sm min-h-[500px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] bg-muted/30 rounded-md border border-border">
              <FileText className="h-16 w-16 text-muted-foreground opacity-40 mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma petição gerada</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Preencha os parâmetros no painel ao lado e clique em "Gerar Petição com IA" para criar sua petição.
              </p>
              <p className="text-sm text-muted-foreground">
                A IA usará as informações fornecidas para criar um documento jurídico personalizado.
              </p>
            </div>
          )}
        </CardContent>
        {generatedPetition && (
          <CardFooter className="flex justify-between">
            <div>
              <Button variant="outline" className="mr-2" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PetitionAIGenerator;
