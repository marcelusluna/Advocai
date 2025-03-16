
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Briefcase, 
  FileText, 
  FilePen, 
  DollarSign,
  Home,
  Menu,
  X,
  User,
  Settings,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./sidebar-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  href, 
  isActive,
  isCollapsed
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group hover-lift",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
            aria-label={label}
          >
            <Icon className={cn(
              "h-5 w-5 transition-all",
              isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
            )} />
            {!isCollapsed && (
              <span className="text-sm font-medium transition-all animate-fade-in">
                {label}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar sticky top-0 border-r border-border transition-all duration-300 z-10",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1 rounded-md hover:bg-sidebar-accent transition-colors mx-auto"
                  aria-label={isCollapsed ? "Expandir menu" : "Colapsar menu"}
                >
                  {isCollapsed ? (
                    <Menu className="h-5 w-5 text-sidebar-foreground" />
                  ) : (
                    <X className="h-5 w-5 text-sidebar-foreground" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side={isCollapsed ? "right" : "bottom"}>
                <p>{isCollapsed ? "Expandir menu" : "Colapsar menu"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* User Profile Section */}
        <div className="px-3 py-4 border-b border-border">
          {!isCollapsed ? (
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt="Foto do perfil" />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium">João da Silva</h3>
                <p className="text-xs text-muted-foreground">Advogado(a) • OAB/SP 123456</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Perfil e Escritório
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/office" className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      <span>Meu Escritório</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt="Foto do perfil" />
                      <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>João da Silva • OAB/SP 123456</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
        
        <div className="mt-auto p-4 border-t border-border">
          {!isCollapsed && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground animate-fade-in">
              <span>v1.0</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
