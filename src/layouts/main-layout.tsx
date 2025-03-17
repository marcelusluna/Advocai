
import React, { useState } from "react";
import Sidebar from "@/components/navigation/sidebar";
import AiAssistant from "@/components/ai/ai-assistant";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="h-full">
          {children}
        </div>
      </main>
      <AiAssistant />
    </div>
  );
};

export default MainLayout;
