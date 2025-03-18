
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Wand2, Save, Download, Copy, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

  const handleGeneratePetition = () => {
    if (!petitionTitle || !petitionType || !lawArea || !caseDescription) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios para gerar a petição.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulating AI petition generation with a timeout
    setTimeout(() => {
      // Template generation based on petition type
      let generatedText = "";
      
      if (petitionType === "initial") {
        generatedText = `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CÍVEL DA COMARCA DE SÃO PAULO/SP

${clientName || "[NOME DO CLIENTE]"}, [nacionalidade], [estado civil], [profissão], inscrito(a) no CPF sob nº XXX.XXX.XXX-XX, residente e domiciliado(a) na [endereço completo], por seu advogado que esta subscreve (procuração anexa), vem, respeitosamente, à presença de Vossa Excelência, com fundamento no artigo 319 do Código de Processo Civil, propor a presente

${petitionTitle.toUpperCase()}

em face de ${opposingParty || "[NOME DA PARTE CONTRÁRIA]"}, [qualificação completa], pelos fatos e fundamentos a seguir expostos.

I - DOS FATOS

${caseDescription}

II - DO DIREITO

${lawArea === "consumer" ? 
  "Aplica-se à presente demanda o Código de Defesa do Consumidor, em seu artigo 2º e seguintes. A relação estabelecida entre as partes é nitidamente de consumo, sendo o autor consumidor e o réu fornecedor, nos termos da legislação consumerista." 
  : 
  "Conforme estabelecido pelo ordenamento jurídico brasileiro, especialmente o Código Civil em seus artigos pertinentes, a conduta da parte ré configura ilícito civil passível de reparação."}

III - DOS PEDIDOS

Ante o exposto, requer:

a) A citação da parte Ré para, querendo, apresentar defesa, sob pena de revelia;
b) A procedência da ação, condenando-se a parte Ré a [especificar pedidos];
c) A condenação da parte Ré ao pagamento de custas processuais e honorários advocatícios;
d) A produção de todas as provas em direito admitidas.

Dá-se à causa o valor de R$ [valor].

Termos em que,
Pede deferimento.

[Cidade], [data].

[Advogado]
OAB/XX nº XXXXX`;
      } else if (petitionType === "appeal") {
        generatedText = `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) DESEMBARGADOR(A) PRESIDENTE DO EGRÉGIO TRIBUNAL DE JUSTIÇA DO ESTADO DE SÃO PAULO

Processo nº [número do processo]

${clientName || "[NOME DO CLIENTE]"}, já qualificado(a) nos autos do processo em epígrafe, por seu advogado que esta subscreve, vem, respeitosamente, perante Vossa Excelência, com fundamento no art. 1.009 e seguintes do Código de Processo Civil, interpor o presente

RECURSO DE APELAÇÃO

em face da r. sentença de fls. [número das folhas], que julgou [procedente/improcedente] o pedido inicial, requerendo o seu processamento e posterior remessa ao Egrégio Tribunal de Justiça, pelos fundamentos de fato e de direito a seguir expostos.

I - DA TEMPESTIVIDADE

O presente recurso é tempestivo, tendo em vista que a intimação da r. sentença ocorreu em [data], iniciando-se o prazo recursal em [data] e findando-se em [data].

II - SÍNTESE DA DEMANDA

${caseDescription}

III - DAS RAZÕES DE REFORMA

${additionalInstructions || "Exposição detalhada dos motivos pelos quais a sentença deve ser reformada."}

IV - DO PEDIDO

Ante o exposto, requer o conhecimento e provimento do presente recurso, reformando-se integralmente a r. sentença recorrida para [especificar pedido].

Termos em que,
Pede deferimento.

[Cidade], [data].

[Advogado]
OAB/XX nº XXXXX`;
      } else {
        generatedText = `[CABEÇALHO CONFORME TIPO DE PETIÇÃO: ${petitionTitle}]

PROCESSO Nº: [NÚMERO DO PROCESSO]
REQUERENTE: ${clientName || "[NOME DO CLIENTE]"}
REQUERIDO: ${opposingParty || "[NOME DA PARTE CONTRÁRIA]"}

EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA [VARA/COMARCA]

${clientName || "[NOME DO CLIENTE]"}, já qualificado(a) nos autos do processo em epígrafe, por seu advogado que esta subscreve, vem, respeitosamente, à presença de Vossa Excelência, expor e requerer o que segue:

I - DOS FATOS

${caseDescription}

II - DO DIREITO

[Fundamentação jurídica específica para ${lawArea}]

${additionalInstructions ? `III - ${additionalInstructions.toUpperCase()}` : ""}

IV - DOS PEDIDOS

Diante do exposto, requer a Vossa Excelência:

a) [Descrição do pedido principal];
b) [Descrição de pedidos acessórios];
c) [Outros pedidos pertinentes].

Termos em que,
Pede deferimento.

[Cidade], [data].

[Advogado]
OAB/XX nº XXXXX`;
      }
      
      setGeneratedPetition(generatedText);
      setIsGenerating(false);
      
      toast({
        title: "Petição gerada com sucesso!",
        description: "Sua petição foi gerada pela IA. Revise o conteúdo antes de utilizar.",
      });
    }, 2000);
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
