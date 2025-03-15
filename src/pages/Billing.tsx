
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";

const Billing: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Honorários</h1>
            <p className="text-muted-foreground">
              Gerencie seus honorários e faturamento
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-muted-foreground">
                Funcionalidade de gestão de honorários em desenvolvimento
              </p>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Billing;
