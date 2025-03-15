
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
        "w-full px-4 md:px-6 mx-auto max-w-7xl animate-fade-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
