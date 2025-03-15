
import React from "react";
import Sidebar from "@/components/navigation/sidebar";
import AiAssistant from "@/components/ai/ai-assistant";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <AiAssistant />
    </div>
  );
};

export default MainLayout;
