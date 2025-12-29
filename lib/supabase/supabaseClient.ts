// // docs: https://extfast-docs.hashnode.space/docs/supabase
// import { useSession, useUser } from '@clerk/nextjs';

// import { createClient } from '@supabase/supabase-js';
// // import type { Database } from './supabaseTypes';

// function createClerkSupabaseClient() {
//   const { session } = useSession();

//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       async accessToken() {
//         return session?.getToken() ?? null;
//       },
//     }
//   );
// }

// const supabase = createClerkSupabaseClient();

// export default supabase;
