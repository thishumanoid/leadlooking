
/// NOTE: you don't need to use this endpoint because the user will automatically get inserted into PremiumUsers table via webhook function, you can delete this file if you think you will never need to add user manually


import supabaseAdmin from "@/lib/supabase/supabaseAdmin";

async function checkPremiumUsers(userEmail: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('PremiumUsers')
      .select()
      .eq('user_email', userEmail)
      .single();

    if (data) return true;
    if (error) return false;
  } catch (error) {
    return false;
  }
}

async function addToPremiumUsers(userEmail: string) {
  try {
    const alreadyInserted = await checkPremiumUsers(userEmail);

    if (alreadyInserted) {
      return true;
    }

    const { data, error } = await supabaseAdmin
      .from('PremiumUsers')
      .insert({
        user_email: userEmail,
        plan_type: 'monthly',
        credits_used: 0,
        subscription_status: 'active',
        /// add other fields
      })
      .select();

    if (data) return true;
    if (error) return false;
  } catch (error) {
    return false;
  }
}

export async function POST(request: Request) {
  const { userEmail } = await request.json();

  if (!userEmail) {
    return new Response(JSON.stringify({ message: 'email is missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await addToPremiumUsers(userEmail);

  if (result) {
    return new Response(JSON.stringify({ message: 'success' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'failed' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
