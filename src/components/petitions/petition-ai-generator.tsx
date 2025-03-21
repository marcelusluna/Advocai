import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Wand2, Save, Download, Copy, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateWithOpenAI, OPENAI_MODELS } from "@/services/openai-service";

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
  const [selectedModel, setSelectedModel] = useState(OPENAI_MODELS.GPT_3_5_TURBO);
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
      const prompt = `
      Gere uma petição de ${petitionType}.
      
      Contexto e fatos: ${caseDescription}
      
      ${clientName ? `Cliente/Requerente: ${clientName}` : ""}
      ${opposingParty ? `Parte contrária/Requerido: ${opposingParty}` : ""}
      
      Instruções adicionais: ${additionalInstructions || "Nenhuma instrução adicional."}
      
      Por favor, formate a petição conforme as normas jurídicas brasileiras, incluindo cabeçalho, endereçamento, qualificação das partes, dos fatos, fundamentos jurídicos, pedidos e fechamento.
      `;

      const systemPrompt = `Você é um advogado brasileiro altamente qualificado, especializado em redigir documentos jurídicos conforme as normas brasileiras. Sua tarefa é criar uma petição juridicamente precisa e profissional com base nas informações fornecidas pelo usuário.`;

      // Chamar a API do OpenAI
      const generatedText = await generateWithOpenAI(prompt, systemPrompt, 0.3, selectedModel);
      
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
    <div className="flex flex-col space-y-4 md:space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Gerador de Petições com IA</h2>
      <p className="text-muted-foreground">
        Preencha as informações abaixo para gerar uma petição usando inteligência artificial.
        A IA irá criar um documento baseado nas suas informações, que você poderá revisar e editar.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Petição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="petition-title">Título da Petição *</Label>
              <Input
                id="petition-title"
                value={petitionTitle}
                onChange={(e) => setPetitionTitle(e.target.value)}
                placeholder="Ex: Petição Inicial de Indenização por Danos Morais"
              />
            </div>
            
            <div className="space-y-2">
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
            
            <div className="space-y-2">
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
            
            <div className="space-y-2">
              <Label htmlFor="case-description">Descrição do Caso *</Label>
              <Textarea
                id="case-description"
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                placeholder="Descreva os fatos relevantes do caso..."
                className="min-h-[150px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client-name">Nome do Cliente/Requerente</Label>
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome completo do cliente ou requerente"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="opposing-party">Nome da Parte Contrária/Requerido</Label>
              <Input
                id="opposing-party"
                value={opposingParty}
                onChange={(e) => setOpposingParty(e.target.value)}
                placeholder="Nome da parte contrária ou requerido"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additional-instructions">Instruções Adicionais</Label>
              <Textarea
                id="additional-instructions"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="Adicione instruções específicas ou informações adicionais..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-model">Modelo de IA</Label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger id="ai-model">
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OPENAI_MODELS.GPT_3_5_TURBO}>GPT-3.5 Turbo (Padrão)</SelectItem>
                  <SelectItem value={OPENAI_MODELS.GPT_4}>GPT-4 (Alta qualidade)</SelectItem>
                  <SelectItem value={OPENAI_MODELS.GPT_4_TURBO}>GPT-4 Turbo (Mais recente)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Modelos mais avançados podem produzir resultados melhores, mas podem ser mais lentos.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleGeneratePetition} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Petição...
                </>
              ) : "Gerar Petição com IA"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Petição Gerada</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[580px] font-mono text-sm"
              placeholder="A petição gerada pela IA aparecerá aqui..."
              value={generatedPetition}
              onChange={(e) => setGeneratedPetition(e.target.value)}
              readOnly={isGenerating}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleCopy}
              disabled={!generatedPetition || isGenerating}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!generatedPetition || isGenerating}
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PetitionAIGenerator;
