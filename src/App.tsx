
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import Cases from "./pages/Cases";
import Documents from "./pages/Documents";
import Contracts from "./pages/Contracts";
import Billing from "./pages/Billing";
import PetitionGenerator from "./pages/PetitionGenerator";
import Profile from "./pages/Profile";
import Office from "./pages/Office";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/petition-generator" element={<PetitionGenerator />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/office" element={<Office />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
