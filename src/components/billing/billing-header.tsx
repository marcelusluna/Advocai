
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

interface BillingHeaderProps {
  title: string;
  description: string;
}

const BillingHeader: React.FC<BillingHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Fatura
        </Button>
      </div>
    </div>
  );
};

export default BillingHeader;
