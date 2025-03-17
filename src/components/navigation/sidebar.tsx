
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
  ChevronLeft,
  User,
  Settings,
  Building,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./sidebar-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

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
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-gray-600",
              isActive 
                ? "bg-blue-50 text-blue-600" 
                : "hover:bg-gray-100"
            )}
            aria-label={label}
          >
            <Icon className={cn(
              "h-5 w-5",
              isActive ? "text-blue-600" : "text-gray-500"
            )} />
            {!isCollapsed && (
              <span className={cn(
                "text-sm font-medium transition-opacity",
                isActive ? "text-blue-600" : "text-gray-600"
              )}>
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

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  
  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/c00e8e22-2552-42f7-a22a-8b0f08c510a8.png" 
                alt="Logo" 
                className="h-8 w-auto" 
              />
              <span className="font-medium text-gray-800 tracking-tight">Advoc.AI</span>
            </div>
          ) : (
            <img 
              src="/lovable-uploads/c00e8e22-2552-42f7-a22a-8b0f08c510a8.png" 
              alt="Logo" 
              className="h-8 w-auto mx-auto" 
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "p-1.5 rounded-md hover:bg-gray-100 transition-colors",
              collapsed ? "mx-auto" : ""
            )}
            aria-label={collapsed ? "Expandir menu" : "Colapsar menu"}
          >
            {collapsed ? (
              <Menu className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        
        {/* Barra de pesquisa */}
        <div className={cn(
          "px-3 py-3 border-b border-gray-100",
          collapsed ? "hidden" : "block"
        )}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Pesquisar..." 
              className="pl-9 h-9 text-sm bg-gray-50 border-gray-200 focus:bg-white focus-visible:ring-blue-600 focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className={cn(
          "px-3 py-4 border-b border-gray-100",
          collapsed ? "flex justify-center" : ""
        )}>
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="Foto do perfil" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">JD</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <h3 className="font-medium text-sm text-gray-800 truncate">João da Silva</h3>
                <p className="text-xs text-gray-500 truncate">OAB/SP 123456</p>
              </div>
            </div>
          ) : (
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="Foto do perfil" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">JD</AvatarFallback>
            </Avatar>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
              isCollapsed={collapsed}
            />
          ))}
        </nav>
        
        <div className="mt-auto p-3 border-t border-gray-100">
          {!collapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start text-sm text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
                    <span>Preferências</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-9 h-9 mx-auto">
                    <Settings className="h-5 w-5 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Configurações</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
