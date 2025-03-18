
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, BookOpen, FileText, Download, Copy, Filter, ArrowDown, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Dados fictícios de jurisprudência
const jurisprudenceData = [
  {
    id: "1",
    title: "Recurso Especial nº 1.737.412/SE",
    court: "STJ",
    judge: "Min. Nancy Andrighi",
    date: "12/03/2022",
    topic: "Direito do Consumidor",
    summary: "RECURSO ESPECIAL. AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS. NEGATIVAÇÃO INDEVIDA. INSCRIÇÃO EM CADASTRO DE INADIMPLENTES. DANO MORAL IN RE IPSA. QUANTUM INDENIZATÓRIO. REVISÃO. IMPOSSIBILIDADE. SÚMULA 7/STJ. 1. A jurisprudência do STJ é no sentido de que a inscrição indevida do nome do consumidor em cadastros de inadimplentes enseja dano moral in re ipsa. 2. O valor da indenização por danos morais, arbitrado em R$ 10.000,00, não se mostra excessivo, diante das peculiaridades do caso concreto. 3. Recurso especial improvido."
  },
  {
    id: "2",
    title: "Agravo em Recurso Especial nº 1.910.226/SP",
    court: "STJ",
    judge: "Min. Ricardo Villas Bôas Cueva",
    date: "05/05/2022",
    topic: "Direito Civil",
    summary: "AGRAVO EM RECURSO ESPECIAL. AÇÃO DE RESCISÃO CONTRATUAL C/C INDENIZAÇÃO POR DANOS MATERIAIS E MORAIS. COMPROMISSO DE COMPRA E VENDA DE IMÓVEL. ATRASO NA ENTREGA. LUCROS CESSANTES. CABIMENTO. SÚMULA 83/STJ. AGRAVO CONHECIDO PARA NEGAR PROVIMENTO AO RECURSO ESPECIAL."
  },
  {
    id: "3",
    title: "Recurso Extraordinário nº 958.252/MG",
    court: "STF",
    judge: "Min. Luiz Fux",
    date: "30/08/2021",
    topic: "Direito Trabalhista",
    summary: "RECURSO EXTRAORDINÁRIO. TERCEIRIZAÇÃO. LICITUDE. ATIVIDADE-FIM. ATIVIDADE-MEIO. SÚMULA 331 DO TST. CONSTITUCIONALIDADE. LIVRE INICIATIVA. PRINCÍPIO DA LEGALIDADE. 1. É lícita a terceirização ou qualquer outra forma de divisão do trabalho entre pessoas jurídicas distintas, independentemente do objeto social das empresas envolvidas, mantida a responsabilidade subsidiária da empresa contratante. 2. Recurso extraordinário provido."
  },
  {
    id: "4",
    title: "Apelação Cível nº 1.0000.22.123456-7/001",
    court: "TJMG",
    judge: "Des. Maria Helena Carreira",
    date: "14/02/2023",
    topic: "Direito de Família",
    summary: "APELAÇÃO CÍVEL. AÇÃO DE ALIMENTOS. BINÔMIO NECESSIDADE-POSSIBILIDADE. MODIFICAÇÃO DO PERCENTUAL FIXADO. IMPOSSIBILIDADE. AUSÊNCIA DE PROVA DA CAPACIDADE FINANCEIRA DO ALIMENTANTE. RECURSO DESPROVIDO. 1. A fixação dos alimentos deve observar o binômio necessidade-possibilidade, de modo a estabelecer um valor que seja suficiente para suprir as necessidades do alimentando, mas que esteja dentro das possibilidades financeiras do alimentante. 2. Apelação conhecida e não provida."
  },
  {
    id: "5",
    title: "Habeas Corpus nº 654.823/RJ",
    court: "STJ",
    judge: "Min. Rogério Schietti Cruz",
    date: "18/06/2022",
    topic: "Direito Penal",
    summary: "HABEAS CORPUS. TRÁFICO DE DROGAS. PRISÃO PREVENTIVA. FUNDAMENTAÇÃO INIDÔNEA. CONSTRANGIMENTO ILEGAL EVIDENCIADO. ORDEM CONCEDIDA. 1. A prisão preventiva, enquanto medida de natureza cautelar, somente pode ser decretada quando demonstrada, de forma concreta, a existência dos pressupostos e requisitos previstos no art. 312 do Código de Processo Penal. 2. No caso dos autos, o decreto preventivo não indica elementos concretos e individualizados que demonstrem a necessidade da custódia cautelar. 3. Ordem concedida para revogar a prisão preventiva do paciente, mediante a imposição de medidas cautelares alternativas."
  }
];

const courts = [
  { id: "all", name: "Todos os Tribunais" },
  { id: "stf", name: "STF" },
  { id: "stj", name: "STJ" },
  { id: "trf", name: "TRFs" },
  { id: "tjsp", name: "TJSP" },
  { id: "tjrj", name: "TJRJ" },
  { id: "tjmg", name: "TJMG" }
];

const topics = [
  { id: "all", name: "Todas as Áreas" },
  { id: "civil", name: "Direito Civil" },
  { id: "consumer", name: "Direito do Consumidor" },
  { id: "labor", name: "Direito Trabalhista" },
  { id: "criminal", name: "Direito Penal" },
  { id: "tax", name: "Direito Tributário" },
  { id: "family", name: "Direito de Família" }
];

const JurisprudenceSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("desc");
  const [showOnlyRelevant, setShowOnlyRelevant] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Termo de busca vazio",
        description: "Por favor, digite um termo para realizar a busca.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulando uma busca com timeout
    setTimeout(() => {
      // Filtrar jurisprudência com base nos critérios
      let results = [...jurisprudenceData];
      
      // Filtragem por termo de busca
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Filtragem por tribunal
      if (selectedCourt !== "all") {
        results = results.filter(item => 
          item.court.toLowerCase() === selectedCourt.toLowerCase()
        );
      }
      
      // Filtragem por área
      if (selectedTopic !== "all") {
        results = results.filter(item => {
          const topicObj = topics.find(t => t.id === selectedTopic);
          return topicObj ? item.topic === topicObj.name : true;
        });
      }
      
      // Ordenação por data
      results.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return sortByDate === "asc" 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      });
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar seus critérios de busca para encontrar jurisprudências relevantes.",
        });
      } else {
        toast({
          title: `${results.length} resultado(s) encontrado(s)`,
          description: "Jurisprudências listadas por relevância.",
        });
      }
    }, 1500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Texto copiado!",
      description: "O texto da jurisprudência foi copiado para a área de transferência.",
    });
  };

  const toggleSortOrder = () => {
    setSortByDate(sortByDate === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Busca de Jurisprudência</CardTitle>
          <CardDescription>
            Pesquise decisões judiciais e jurisprudências relevantes para seu caso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite termos de busca, número do processo ou ementa..."
                className="pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="court">Tribunal</Label>
                <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                  <SelectTrigger id="court">
                    <SelectValue placeholder="Selecione o tribunal" />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((court) => (
                      <SelectItem key={court.id} value={court.id}>
                        {court.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="topic">Área do Direito</Label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full" disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Search className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Buscar Jurisprudência
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="relevant" 
                checked={showOnlyRelevant}
                onCheckedChange={(checked) => setShowOnlyRelevant(checked as boolean)}
              />
              <Label htmlFor="relevant" className="text-sm cursor-pointer">
                Mostrar apenas resultados mais relevantes
              </Label>
              
              <div className="ml-auto flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs"
                  onClick={toggleSortOrder}
                >
                  <Filter className="mr-1 h-3 w-3" />
                  Data
                  {sortByDate === "desc" ? (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{result.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {result.court} • {result.judge} • {result.date} • {result.topic}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleCopy(result.summary)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-muted/40 p-3 rounded-md text-sm">
                  {result.summary}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchTerm && !isSearching ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground opacity-40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Não foram encontradas jurisprudências correspondentes aos critérios de busca.
              Tente termos mais amplos ou diferentes filtros.
            </p>
          </CardContent>
        </Card>
      ) : !searchTerm ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground opacity-40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Busque jurisprudências relevantes</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Digite termos relacionados ao seu caso na barra de busca acima para encontrar
              jurisprudências que possam fortalecer suas petições.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default JurisprudenceSearch;
