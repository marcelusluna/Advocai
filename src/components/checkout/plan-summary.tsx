
import React from "react";
import { getPlanDetails } from "@/utils/stripe-utils";

interface PlanSummaryProps {
  planName: string;
  planPrice: string;
}

export const PlanSummary: React.FC<PlanSummaryProps> = ({ planName, planPrice }) => {
  const planDetails = getPlanDetails(planName);
  
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
      {planDetails.priceId && (
        <div className="text-xs text-gray-500 pt-1">
          <span>ID: {planDetails.priceId}</span>
        </div>
      )}
    </div>
  );
};
