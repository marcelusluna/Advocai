
import React from "react";
import { Label } from "@/components/ui/label";
import { CardElement } from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";

// Card element styling options
export const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
      iconColor: '#3b82f6',
    },
    invalid: {
      color: '#e11d48',
      iconColor: '#e11d48',
    },
  },
};

interface CardSectionProps {
  isProcessing: boolean;
  error: string | null;
}

export const CardSection: React.FC<CardSectionProps> = ({ isProcessing, error }) => {
  return (
    <div className="space-y-2">
      <Label className="text-gray-700">Dados do cartão</Label>
      <div className={`bg-white border rounded-md p-4 transition-all ${isProcessing ? 'opacity-50' : ''} focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-40`}>
        <CardElement options={cardElementOptions} />
      </div>
      
      <div className="flex items-center text-xs text-gray-500 mt-2">
        <Lock className="h-3 w-3 mr-1" />
        <span>Seus dados estão seguros e criptografados</span>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-start mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
