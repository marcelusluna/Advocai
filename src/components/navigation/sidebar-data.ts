
import { 
  Users, 
  Briefcase, 
  FileText, 
  FilePen, 
  DollarSign,
  Home,
  BookOpen
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Users, label: "Clientes", href: "/clients" },
  { icon: Briefcase, label: "Processos", href: "/cases" },
  { icon: FileText, label: "Documentos", href: "/documents" },
  { icon: FilePen, label: "Contratos", href: "/contracts" },
  { icon: BookOpen, label: "Petições e Jurisprudência", href: "/petition-generator" },
  { icon: DollarSign, label: "Honorários", href: "/billing" },
];
