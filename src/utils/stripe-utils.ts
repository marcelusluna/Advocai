
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
export const stripePromise = loadStripe("pk_live_51R4id2RtWossoVT0xB9yFMhDr2HTyclYcyKIO4HsRHEe2LxwbN9wAq1TJ4YCv2VFyJAjrKDq9x0KCHgT0XTG24WA00c8ieDbkf");

// Helper function to format price as Brazilian currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Plans configuration
export const plans = {
  básico: {
    id: 'basic',
    price: 97,
    trialPeriodDays: 14
  },
  avançado: {
    id: 'advanced',
    price: 147,
    trialPeriodDays: 14,
    priceId: 'price_1R4nxFRtWossoVT0Tme3VYbJ'
  },
  personalizado: {
    id: 'custom',
    price: 297,
    trialPeriodDays: 14
  },
  profissional: {
    id: 'professional',
    price: 197,
    trialPeriodDays: 14,
    priceId: 'price_1R4nwpRtWossoVT0mkaZj0Sd'
  }
};

// Get plan details by name
export const getPlanDetails = (planName: string) => {
  const normalizedName = planName.toLowerCase();
  
  switch (normalizedName) {
    case 'básico':
    case 'basico':
      return plans.básico;
    case 'avançado':
    case 'avancado':
      return plans.avançado;
    case 'personalizado':
      return plans.personalizado;
    case 'profissional':
      return plans.profissional;
    default:
      return plans.básico; // Default to básico if not found
  }
};
