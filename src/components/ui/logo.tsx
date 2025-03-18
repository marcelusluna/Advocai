
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <img 
        src="/lovable-uploads/4628b0e1-0f3e-4223-8f42-093d31640010.png" 
        alt="Advoc.AI Logo" 
        className={cn(sizeClasses[size], "rounded")}
      />
      <span className="text-primary font-bold text-3xl">Advoc.AI</span>
    </div>
  );
};

export default Logo;
