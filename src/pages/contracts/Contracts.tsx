
import React, { useContext } from "react";
import MainLayout, { CreateEntityContext } from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import ContractsHeader from "./components/ContractsHeader";
import ContractsTable from "./components/ContractsTable";
import ContractsStatistics from "./components/ContractsStatistics";
import { ContractsProvider } from "./context/ContractsContext";

const Contracts: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <ContractsProvider>
            <ContractsHeader />
            <ContractsTable />
            <ContractsStatistics />
          </ContractsProvider>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Contracts;
