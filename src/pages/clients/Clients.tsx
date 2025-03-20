
import React, { useContext } from "react";
import MainLayout, { CreateEntityContext } from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import ClientsHeader from "./components/ClientsHeader";
import ClientsTable from "./components/ClientsTable";
import ClientsStatistics from "./components/ClientsStatistics";
import { ClientsProvider } from "./context/ClientsContext";

const Clients: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <ClientsProvider>
            <ClientsHeader />
            <ClientsTable />
            <ClientsStatistics />
          </ClientsProvider>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Clients;
