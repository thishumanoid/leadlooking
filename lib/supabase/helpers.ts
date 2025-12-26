import supabaseAdmin from '@/lib/supabase/supabaseAdmin';


export async function isEligibleUser(userEmail: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('PremiumUsers')
      .select()
      .eq('user_email', userEmail)
      .single();


    if (data) {
      const premiumStatus = data.subscription_status.trim().toLowerCase();

      if (premiumStatus === 'active' || premiumStatus === 'trialing') return true;
    }

    if (error) return false;
  } catch (error) {
    return false;
  }
}