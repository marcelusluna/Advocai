
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from "@/integrations/supabase/client";

// Define uma interface para os planos
export interface Plan {
  id: string;
  name: string;
  price: number;
  trialPeriodDays: number;
  priceId?: string;
  description?: string;
}

// Inicializa o Stripe com a chave pública
export const stripePromise = loadStripe("pk_live_51R4id2RtWossoVT0xB9yFMhDr2HTyclYcyKIO4HsRHEe2LxwbN9wAq1TJ4YCv2VFyJAjrKDq9x0KCHgT0XTG24WA00c8ieDbkf");

// Função para formatar o preço como moeda brasileira
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Carrega os planos do banco de dados
export const fetchPlansFromDatabase = async (): Promise<Record<string, Plan>> => {
  try {
    const { data, error } = await supabase
      .from('planos')
      .select('*')
      .eq('is_ativo', true);
    
    if (error) {
      console.error("Erro ao buscar planos:", error);
      return getDefaultPlans();
    }
    
    if (!data || data.length === 0) {
      console.warn("Nenhum plano encontrado no banco de dados");
      return getDefaultPlans();
    }
    
    // Converte os dados da tabela para o formato esperado pela aplicação
    const plansRecord: Record<string, Plan> = {};
    
    data.forEach(plan => {
      plansRecord[plan.nome.toLowerCase()] = {
        id: plan.codigo,
        name: plan.nome,
        price: Number(plan.preco),
        trialPeriodDays: plan.periodo_trial_dias,
        priceId: plan.stripe_price_id,
        description: plan.descricao
      };
    });
    
    console.log("Planos carregados do banco de dados:", plansRecord);
    return plansRecord;
  } catch (error) {
    console.error("Erro ao buscar planos do banco de dados:", error);
    return getDefaultPlans();
  }
};

// Planos padrão como fallback caso não seja possível acessar o banco de dados
const getDefaultPlans = (): Record<string, Plan> => {
  return {
    'profissional': {
      id: 'professional',
      name: 'Profissional',
      price: 149.90,
      trialPeriodDays: 14,
      priceId: 'price_1R4nwpRtWossoVT0mkaZj0Sd'
    },
    'avançado': {
      id: 'advanced',
      name: 'Avançado',
      price: 249.90,
      trialPeriodDays: 14,
      priceId: 'price_1R4nxFRtWossoVT0Tme3VYbJ'
    }
  };
};

// Cache para os planos
let cachedPlans: Record<string, Plan> | null = null;

// Obter planos (do cache ou do banco de dados)
export const getPlans = async (): Promise<Record<string, Plan>> => {
  if (!cachedPlans) {
    cachedPlans = await fetchPlansFromDatabase();
  }
  return cachedPlans;
};

// Função para obter detalhes de um plano por nome
export const getPlanDetails = async (planName: string): Promise<Plan> => {
  const plans = await getPlans();
  const normalizedName = planName.toLowerCase();
  
  // Busca o plano pelo nome normalizado
  if (plans[normalizedName]) {
    return plans[normalizedName];
  }
  
  // Fallback para planos alternativos
  switch (normalizedName) {
    case 'basico':
    case 'básico':
      return plans['profissional']; // Redireciona para o plano Profissional
    case 'personalizado':
      return plans['avançado']; // Redireciona para o plano Avançado
    default:
      return plans['profissional']; // Default para o plano Profissional
  }
};
