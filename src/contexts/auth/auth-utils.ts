
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

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
    
    // Create user object with combined data
    return {
      id: userId,
      name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || "Usuário",
      email: authUser.email || "",
      plan: userData?.plano || "Teste",
      trialEndsAt: userData?.data_fim,
      paymentMethodId: userData?.stripe_payment_method_id
    };
  } catch (error) {
    console.error("Erro ao buscar dados de usuário:", error);
    return null;
  }
};
