import React, { useState, useEffect } from "react";
import { Wand2, Sparkles, Copy, Save, Download, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { generateWithOpenAI, OPENAI_MODELS } from "@/services/openai-service";
import { Loader2 } from "lucide-react";

// Modelos de documentos fictícios
const documentTemplates = [
  { id: "1", name: "Petição Inicial Cível", category: "Petição", description: "Modelo padrão para ajuizamento de ações cíveis" },
  { id: "2", name: "Contestação Cível", category: "Petição", description: "Modelo para contestação em processos cíveis" },
  { id: "3", name: "Contrato de Prestação de Serviços", category: "Contrato", description: "Contrato padrão para prestação de serviços advocatícios" },
  { id: "4", name: "Procuração Ad Judicia", category: "Instrumental", description: "Modelo de procuração com poderes para representação judicial" },
  { id: "5", name: "Recurso de Apelação", category: "Recurso", description: "Modelo para interposição de recurso de apelação" }
];

// Lista de clientes fictícios para associar ao documento
const clientsList = [
  { id: "1", name: "Maria Silva" },
  { id: "2", name: "João Pereira" },
  { id: "3", name: "Tech Solutions Ltda." },
  { id: "4", name: "Construções Rápidas S.A." },
  { id: "5", name: "Ana Beatriz" }
];

// Lista de processos fictícios para associar ao documento
const casesList = [
  { id: "1", number: "0001234-12.2023.8.26.0100", title: "Maria Silva vs. Banco XYZ" },
  { id: "2", number: "0003456-34.2023.8.26.0100", title: "João Pereira vs. Seguradora ABC" },
  { id: "3", number: "0005678-56.2023.8.26.0100", title: "Tech Solutions vs. Fornecedor XYZ" }
];

interface DocumentGeneratorProps {
  onDocumentGenerated?: (document: any) => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ onDocumentGenerated }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedCase, setSelectedCase] = useState<string>("");
  const [documentTitle, setDocumentTitle] = useState<string>("");
  const [documentContent, setDocumentContent] = useState<string>("");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { toast } = useToast();

  // Seleção de template
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Preenche o conteúdo com um texto de exemplo baseado no template selecionado
    const template = documentTemplates.find(t => t.id === templateId);
    if (template) {
      if (template.category === "Petição") {
        setDocumentContent("EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CÍVEL DA COMARCA DE [COMARCA]\n\nProcesso nº [NÚMERO DO PROCESSO]\n\n[NOME DA PARTE AUTORA], já qualificada nos autos do processo em epígrafe, vem, respeitosamente, à presença de Vossa Excelência, por intermédio de seu advogado que esta subscreve, expor e requerer o que segue: ...");
      } else if (template.category === "Contrato") {
        setDocumentContent("CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS\n\nPelo presente instrumento particular, de um lado [NOME DO CLIENTE], [NACIONALIDADE], [ESTADO CIVIL], [PROFISSÃO], inscrito(a) no CPF sob o nº [CPF], residente e domiciliado(a) na [ENDEREÇO COMPLETO], doravante denominado(a) CONTRATANTE, e de outro lado [NOME DO ADVOGADO/ESCRITÓRIO], inscrito na OAB/[ESTADO] sob o nº [NÚMERO OAB], com endereço profissional na [ENDEREÇO COMPLETO], doravante denominado CONTRATADO, têm entre si justo e contratado o seguinte: ...");
      } else {
        setDocumentContent("Digite aqui o conteúdo do seu documento ou utilize a IA para gerar uma sugestão de texto...");
      }
    }
  };

  // Função para gerar documento com IA
  const generateWithAI = async () => {
    if (!documentTemplates.find(t => t.id === selectedTemplate)?.category || !aiPrompt.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione o tipo de documento e forneça instruções para a IA.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      
      const template = documentTemplates.find(t => t.id === selectedTemplate);
      const client = clientsList.find(c => c.id === selectedClient);
      
      const prompt = `
      Preciso que você gere um documento do tipo "${template?.name || "documento jurídico"}" com o seguinte título: "${documentTitle || "Documento Jurídico"}".
      
      ${client ? `Cliente: ${client.name}` : ""}
      ${selectedCase ? `Relacionado ao processo: ${casesList.find(c => c.id === selectedCase)?.title || ""}` : ""}
      
      Instruções específicas: ${aiPrompt}
      
      Por favor, formate o documento conforme as normas jurídicas brasileiras, incluindo todos os elementos necessários para este tipo de documento.
      `;

      const systemPrompt = `Você é um advogado brasileiro altamente qualificado, especializado em redigir documentos jurídicos conforme as normas brasileiras. Sua tarefa é criar um documento jurídico profissional com base nas informações fornecidas pelo usuário.`;

      // Chamar a API do OpenAI com o modelo selecionado
      const generatedText = await generateWithOpenAI(prompt, systemPrompt, 0.3, OPENAI_MODELS.GPT_4);
      
      setDocumentContent(generatedText);
      setIsGenerating(false);
      
      toast({
        title: "Documento gerado com sucesso!",
        description: "O texto foi criado com base nas suas instruções.",
      });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Erro ao gerar documento",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao se comunicar com a API da OpenAI.",
        variant: "destructive",
      });
    }
  };

  // Salvar documento
  const saveDocument = () => {
    if (!documentTitle.trim()) {
      toast({
        title: "Título necessário",
        description: "Por favor, dê um título ao seu documento antes de salvar.",
        variant: "destructive",
      });
      return;
    }

    // Simulando salvar o documento
    const newDocument = {
      id: Date.now().toString(),
      name: documentTitle,
      type: documentTemplates.find(t => t.id === selectedTemplate)?.category || "Outro",
      relatedTo: selectedClient 
        ? clientsList.find(c => c.id === selectedClient)?.name 
        : (selectedCase ? casesList.find(c => c.id === selectedCase)?.title : ""),
      createdAt: new Date().toLocaleDateString('pt-BR'),
      modifiedAt: new Date().toLocaleDateString('pt-BR'),
      status: "rascunho",
      createdBy: "Dr. Carlos Santos",
      content: documentContent
    };

    // Callback para o componente pai, se existir
    if (onDocumentGenerated) {
      onDocumentGenerated(newDocument);
    }

    toast({
      title: "Documento salvo com sucesso!",
      description: "O documento foi salvo na biblioteca.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerador de Documentos</CardTitle>
        <CardDescription>
          Use IA para criar documentos jurídicos personalizados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="template">
          <TabsList className="mb-4">
            <TabsTrigger value="template">Usar Modelo</TabsTrigger>
            <TabsTrigger value="ai">Assistente de IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="template" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="template">Modelo de Documento</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Associar a um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsList.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="case">Processo</Label>
                <Select value={selectedCase} onValueChange={setSelectedCase}>
                  <SelectTrigger id="case">
                    <SelectValue placeholder="Associar a um processo" />
                  </SelectTrigger>
                  <SelectContent>
                    {casesList.map((caseItem) => (
                      <SelectItem key={caseItem.id} value={caseItem.id}>
                        {caseItem.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="title">Título do Documento</Label>
              <Input 
                id="title" 
                value={documentTitle} 
                onChange={(e) => setDocumentTitle(e.target.value)} 
                placeholder="Ex: Petição Inicial - João Silva"
                className="mt-1"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">Instruções para a IA</Label>
              <Textarea 
                id="ai-prompt" 
                value={aiPrompt} 
                onChange={(e) => setAiPrompt(e.target.value)} 
                placeholder="Descreva o documento que deseja criar. Ex: 'Criar um contrato de prestação de serviços advocatícios com cláusula de êxito e pagamento mensal'"
                className="min-h-[100px]"
              />
              <Button 
                onClick={generateWithAI} 
                className="mt-2" 
                disabled={isGenerating || !selectedTemplate}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Gerar com IA
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ai-template">Modelo Base</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger id="ai-template">
                    <SelectValue placeholder="Selecione um modelo base" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-client">Cliente</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger id="ai-client">
                    <SelectValue placeholder="Associar a um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsList.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-title">Título do Documento</Label>
                <Input 
                  id="ai-title" 
                  value={documentTitle} 
                  onChange={(e) => setDocumentTitle(e.target.value)} 
                  placeholder="Ex: Contrato - Tech Solutions"
                />
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-6 space-y-2">
            <Label htmlFor="content">Conteúdo do Documento</Label>
            <Textarea 
              id="content" 
              value={documentContent} 
              onChange={(e) => setDocumentContent(e.target.value)} 
              className="font-mono min-h-[400px] text-sm whitespace-pre-wrap overflow-container"
            />
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline" className="mr-2" onClick={() => {
            navigator.clipboard.writeText(documentContent);
            toast({
              title: "Copiado!",
              description: "O texto do documento foi copiado para a área de transferência.",
            });
          }}>
            <Copy className="mr-2 h-4 w-4" />
            Copiar
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "Exportando PDF",
                description: "O documento está sendo exportado para PDF.",
              });
              // Aqui seria implementada a lógica real de exportação para PDF
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
        <Button onClick={saveDocument}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Documento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentGenerator;
