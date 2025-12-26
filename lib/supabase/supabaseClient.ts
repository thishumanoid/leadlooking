// docs: https://extfast-docs.hashnode.space/docs/supabase

import { createClient } from '@supabase/supabase-js';
// import type { Database } from './supabaseTypes';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
);

export default supabase;
