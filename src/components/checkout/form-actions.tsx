
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormActionsProps {
  onCancel: () => void;
  isProcessing: boolean;
  isFormValid: boolean;
  hasStripe: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isProcessing,
  isFormValid,
  hasStripe
}) => {
  return (
    <DialogFooter className="pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isProcessing}
      >
        Cancelar
      </Button>
      <Button 
        type="submit" 
        disabled={!hasStripe || isProcessing || !isFormValid}
        className={`${isProcessing ? "bg-stripe-gradient bg-stripe-loading" : ""}`}
      >
        {isProcessing ? "Processando..." : "Finalizar pagamento"}
      </Button>
    </DialogFooter>
  );
};
