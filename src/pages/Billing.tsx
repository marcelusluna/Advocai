
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import BillingHeader from "@/components/billing/billing-header";
import BillingSummaryCards from "@/components/billing/billing-summary-cards";
import BillingInvoicesTable from "@/components/billing/billing-invoices-table";
import TimeEntriesSection from "@/components/billing/time-entries-section";
import FinancialAnalysis from "@/components/billing/financial-analysis";

const Billing: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <BillingHeader 
            title="Honorários" 
            description="Gerencie seus honorários e faturamento" 
          />
          
          <BillingSummaryCards />
          
          <BillingInvoicesTable />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimeEntriesSection />
            <FinancialAnalysis />
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Billing;
