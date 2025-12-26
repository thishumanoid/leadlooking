// docs: https://extfast-docs.hashnode.space/docs/supabase

import { createClient } from '@supabase/supabase-js';
// import type { Database } from './supabaseTypes';

const supabaseAdmin = createClient(
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