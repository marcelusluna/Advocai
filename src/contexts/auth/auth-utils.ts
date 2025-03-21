import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";
import { saveToStorage, STORAGE_KEYS } from "@/services/storage-service";

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
      console.error("Erro ao buscar dados de assinatura:", userError);
      // Continuar mesmo com erro na busca de assinatura
    }
    
    // Fetch lawyer profile if available
    const { data: profileData, error: profileError } = await supabase
      .from('perfil_advogado')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (profileError) {
      console.error("Erro ao buscar perfil do advogado:", profileError);
      // Continuar mesmo com erro na busca de perfil
    }
    
    // Get user data from session
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) return null;

    // Check if this is the admin user
    const isAdmin = authUser.email === ADMIN_EMAIL;
    
    // Use profile name if available, otherwise use metadata or email
    const userName = profileData?.nome || 
                    authUser.user_metadata?.name || 
                    authUser.email?.split('@')[0] || 
                    "Usuário";
    
    // Create user object with combined data
    const userProfile: User = {
      id: userId,
      name: userName,
      email: profileData?.email || authUser.email || "",
      phone: profileData?.telefone || "",
      oab: profileData?.oab || "",
      bio: profileData?.bio || "",
      plan: isAdmin ? "Administrador" : (userData?.plano || "Teste"),
      trialEndsAt: userData?.data_fim,
      paymentMethodId: userData?.stripe_payment_method_id,
      isAdmin,
      profileId: profileData?.id
    };
    
    // Save the user data in localStorage for persistence
    saveToStorage(STORAGE_KEYS.USER_DATA, userProfile);
    
    return userProfile;
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
