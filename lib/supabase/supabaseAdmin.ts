import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabaseTypes';


const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);


export default supabaseAdmin