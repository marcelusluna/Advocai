
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";

const Cases: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Processos</h1>
            <p className="text-muted-foreground">
              Acompanhe e gerencie seus processos judiciais
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-muted-foreground">
                Funcionalidade de gestão de processos em desenvolvimento
              </p>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Cases;
