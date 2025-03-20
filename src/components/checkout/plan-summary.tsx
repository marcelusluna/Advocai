
import React, { useEffect, useState } from "react";
import { getPlanDetails, Plan } from "@/utils/stripe-utils";

interface PlanSummaryProps {
  planName: string;
  planPrice: string;
}

export const PlanSummary: React.FC<PlanSummaryProps> = ({ planName, planPrice }) => {
  const [planDetails, setPlanDetails] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const details = await getPlanDetails(planName);
        setPlanDetails(details);
      } catch (error) {
        console.error("Erro ao buscar detalhes do plano:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlanDetails();
  }, [planName]);
  
  if (loading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3 mb-2 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3 mb-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Plano:</span>
        <span className="font-semibold">{planName}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Valor:</span>
        <span className="text-xl font-bold text-primary">{planPrice}</span>
      </div>
      {planDetails?.priceId && (
        <div className="text-xs text-gray-500 pt-1">
          <span>ID: {planDetails.priceId}</span>
        </div>
      )}
    </div>
  );
};
