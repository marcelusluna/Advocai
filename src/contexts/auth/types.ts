
// Authentication types
export type User = {
  id: string;
  name: string;
  email: string;
  plan?: string;
  trialEndsAt?: string;
  paymentMethodId?: string;
  isAdmin?: boolean;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
};
