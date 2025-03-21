// Authentication types
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  oab?: string;
  bio?: string;
  plan?: string;
  trialEndsAt?: string;
  paymentMethodId?: string;
  isAdmin?: boolean;
  profileId?: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: string, paymentMethod?: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
  updateUserProfile: (profileData: Partial<User>) => Promise<void>;
};
