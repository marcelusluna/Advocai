
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

// Special admin email
const ADMIN_EMAIL = "marcelusluna09@gmail.com";
const ADMIN_PASSWORD = "Ms091098@"; // Storing this for validation purposes

// Fetch user data from Supabase
export const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    // Fetch user subscription information
    const { data: userData, error: userError } = await supabase
      .from('assinaturas')
      .select('plano, data_fim, stripe_payment_method_id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (userError) {
      console.error("Erro ao buscar dados do usuário:", userError);
      return null;
    }
    
    // Get user data from session
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) return null;

    // Check if this is the admin user
    const isAdmin = authUser.email === ADMIN_EMAIL;
    
    // Create user object with combined data
    return {
      id: userId,
      name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || "Usuário",
      email: authUser.email || "",
      plan: isAdmin ? "Administrador" : (userData?.plano || "Teste"),
      trialEndsAt: userData?.data_fim,
      paymentMethodId: userData?.stripe_payment_method_id,
      isAdmin
    };
  } catch (error) {
    console.error("Erro ao buscar dados de usuário:", error);
    return null;
  }
};

// Check if an email belongs to the admin user
export const isAdminEmail = (email: string): boolean => {
  return email === ADMIN_EMAIL;
};

// Check if credentials match the admin user
export const isAdminCredentials = (email: string, password: string): boolean => {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};
