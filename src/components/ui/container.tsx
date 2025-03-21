import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "w-full px-4 mx-auto animate-fade-in overflow-container",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
