
import React, { useState } from "react";
import { Wand2, Sparkles, Copy, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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

  // Função para gerar documento com IA (simulação)
  const generateWithAI = () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Instruções necessárias",
        description: "Por favor, forneça instruções para a IA gerar o documento.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulação de delay para parecer que está processando
    setTimeout(() => {
      // Gerando conteúdo baseado no template e nas instruções
      let generatedContent = "";
      const template = documentTemplates.find(t => t.id === selectedTemplate);
      const client = clientsList.find(c => c.id === selectedClient);
      
      if (template?.category === "Petição") {
        generatedContent = `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CÍVEL DA COMARCA DE SÃO PAULO/SP

Processo nº ${selectedCase ? casesList.find(c => c.id === selectedCase)?.number : "_______________"}

${client?.name || "[NOME DO CLIENTE]"}, brasileiro(a), inscrito(a) no CPF sob nº XXX.XXX.XXX-XX, com endereço na Rua XXXXX, nº XX, Bairro XXXXX, São Paulo/SP, CEP XXXXX-XXX, por seu advogado que esta subscreve (procuração anexa), vem, respeitosamente, à presença de Vossa Excelência, com fundamento no artigo 319 do Código de Processo Civil, propor a presente

AÇÃO ${aiPrompt.includes("cobrança") ? "DE COBRANÇA" : aiPrompt.includes("indenização") ? "DE INDENIZAÇÃO POR DANOS MORAIS E MATERIAIS" : "ORDINÁRIA"}

em face de EMPRESA REQUERIDA LTDA., pessoa jurídica de direito privado, inscrita no CNPJ sob o nº XX.XXX.XXX/0001-XX, com sede na Rua XXXXX, nº XX, Bairro XXXXX, São Paulo/SP, CEP XXXXX-XXX, pelos fatos e fundamentos a seguir expostos.

I - DOS FATOS

${aiPrompt.includes("contrato") ? 
"No dia XX/XX/XXXX, o Requerente firmou contrato de prestação de serviços com a Requerida, conforme documento anexo. De acordo com o instrumento, a Requerida se comprometeu a prestar os serviços de XXXXX, mediante o pagamento de R$ X.XXX,XX, a ser pago em X parcelas mensais." 
: 
"Em XX/XX/XXXX, o Requerente sofreu danos em razão da conduta da Requerida, quando XXXXX. Os fatos narrados causaram ao Requerente prejuízos de ordem material e moral, conforme será demonstrado."}

II - DO DIREITO

${aiPrompt.includes("consumidor") ? 
"A relação jurídica estabelecida entre as partes é de consumo, aplicando-se, portanto, as disposições do Código de Defesa do Consumidor, em especial os artigos 2º e 3º." 
: 
"Aplica-se ao caso em tela as disposições do Código Civil, em especial os artigos relacionados à responsabilidade civil e ao cumprimento das obrigações contratuais."}

III - DOS PEDIDOS

Ante o exposto, requer:

a) A citação da Requerida, no endereço indicado, para, querendo, apresentar defesa, sob pena de revelia;
b) A procedência da ação para condenar a Requerida ao pagamento de R$ XX.XXX,XX, a título de ${aiPrompt.includes("danos") ? "indenização por danos morais e materiais" : "valores devidos acrescidos de juros e correção monetária"};
c) A condenação da Requerida ao pagamento das custas processuais e honorários advocatícios, estes fixados em 20% sobre o valor da condenação.

Dá-se à causa o valor de R$ XX.XXX,XX.

Termos em que,
Pede deferimento.

São Paulo, ${new Date().toLocaleDateString('pt-BR')}

_______________________________
ADVOGADO(A)
OAB/XX nº XXXXX`;
      } else if (template?.category === "Contrato") {
        generatedContent = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS

Pelo presente instrumento particular, de um lado:

${client?.name || "[NOME DO CLIENTE]"}, brasileiro(a), inscrito(a) no CPF sob nº XXX.XXX.XXX-XX, com endereço na Rua XXXXX, nº XX, Bairro XXXXX, São Paulo/SP, CEP XXXXX-XXX, doravante denominado CONTRATANTE,

e de outro lado:

ESCRITÓRIO DE ADVOCACIA LTDA., inscrito no CNPJ sob o nº XX.XXX.XXX/0001-XX, com sede na Rua XXXXX, nº XX, Bairro XXXXX, São Paulo/SP, CEP XXXXX-XXX, neste ato representado por seu sócio [NOME DO ADVOGADO], inscrito na OAB/XX sob o nº XXXXX, doravante denominado CONTRATADO,

têm entre si justo e contratado o seguinte:

CLÁUSULA PRIMEIRA - DO OBJETO

O presente contrato tem por objeto a prestação de serviços advocatícios pelo CONTRATADO ao CONTRATANTE, relativos ${aiPrompt.includes("tributário") ? "à consultoria e assessoria jurídica em matéria tributária" : aiPrompt.includes("trabalhista") ? "à defesa dos interesses do CONTRATANTE em processos trabalhistas" : "ao patrocínio da causa judicial referente a [DESCRIÇÃO]"}, compreendendo:

${aiPrompt.includes("consultoria") ? 
"a) Consultoria jurídica na área específica;\nb) Elaboração de pareceres;\nc) Análise de documentos e contratos;" 
: 
"a) Elaboração e protocolo de peças processuais;\nb) Acompanhamento de audiências;\nc) Interposição dos recursos cabíveis;"}

CLÁUSULA SEGUNDA - DOS HONORÁRIOS

Pelos serviços descritos na Cláusula Primeira, o CONTRATANTE pagará ao CONTRATADO o valor de R$ XX.XXX,XX (valor por extenso), a ser pago da seguinte forma:

${aiPrompt.includes("mensal") ? 
"a) Honorários mensais no valor de R$ X.XXX,XX (valor por extenso), a serem pagos todo dia XX de cada mês, mediante depósito na conta corrente do CONTRATADO."
: 
"a) Entrada no valor de R$ X.XXX,XX (valor por extenso), a ser pago no ato da assinatura deste contrato;\nb) O saldo remanescente em X parcelas iguais e sucessivas de R$ X.XXX,XX (valor por extenso), vencendo a primeira em XX/XX/XXXX."}

CLÁUSULA TERCEIRA - DOS HONORÁRIOS DE ÊXITO

${aiPrompt.includes("êxito") ? 
"Além dos honorários fixados na Cláusula Segunda, o CONTRATANTE pagará ao CONTRATADO honorários de êxito correspondentes a XX% (percentual por extenso) sobre o proveito econômico obtido."
:
"Não serão devidos honorários de êxito."}

CLÁUSULA QUARTA - DA VIGÊNCIA

${aiPrompt.includes("indeterminado") ? 
"O presente contrato vigorará por prazo indeterminado, podendo ser rescindido por qualquer das partes mediante notificação prévia de 30 (trinta) dias."
:
"O presente contrato vigorará pelo prazo de XX (prazo por extenso) meses, iniciando-se na data de sua assinatura e encerrando-se em XX/XX/XXXX."}

CLÁUSULA QUINTA - DAS DISPOSIÇÕES GERAIS

As partes elegem o foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas oriundas do presente contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.

E, por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença das testemunhas abaixo.

São Paulo, ${new Date().toLocaleDateString('pt-BR')}

_______________________________
CONTRATANTE

_______________________________
CONTRATADO

TESTEMUNHAS:

1. _______________________________
Nome:
CPF:

2. _______________________________
Nome:
CPF:`;
      }
      
      setDocumentContent(generatedContent);
      setIsGenerating(false);
      
      toast({
        title: "Documento gerado com sucesso!",
        description: "O texto foi criado com base nas suas instruções.",
      });
    }, 2000);
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
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
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
              className="font-mono min-h-[400px] text-sm whitespace-pre-wrap"
            />
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline" className="mr-2">
            <Copy className="mr-2 h-4 w-4" />
            Copiar
          </Button>
          <Button variant="outline">
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
