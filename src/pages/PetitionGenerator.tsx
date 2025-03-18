
import React, { useState } from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import JurisprudenceSearch from "@/components/petitions/jurisprudence-search";
import PetitionAIGenerator from "@/components/petitions/petition-ai-generator";

const PetitionGenerator: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Gerador de Petições com IA</h1>
              <p className="text-muted-foreground">
                Crie petições jurídicas assistidas por IA e pesquise jurisprudência relevante
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="generator">Gerador de Petições</TabsTrigger>
              <TabsTrigger value="jurisprudence">Busca de Jurisprudência</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator">
              <PetitionAIGenerator />
            </TabsContent>
            
            <TabsContent value="jurisprudence">
              <JurisprudenceSearch />
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </MainLayout>
  );
};

export default PetitionGenerator;
