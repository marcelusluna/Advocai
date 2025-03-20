
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Mail } from "lucide-react";

interface CustomerInfoFormProps {
  email: string;
  setEmail: (email: string) => void;
  cardName: string;
  setCardName: (name: string) => void;
  isProcessing: boolean;
}

export const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  email,
  setEmail,
  cardName,
  setCardName,
  isProcessing
}) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="pl-10"
            disabled={isProcessing}
            required
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardName" className="text-gray-700">Nome no cartão</Label>
        <div className="relative">
          <Input
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Nome como aparece no cartão"
            className="pl-10"
            disabled={isProcessing}
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
