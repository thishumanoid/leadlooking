import type { User, Session } from "@supabase/supabase-js";
import { Database } from "@/types/supabaseTypes";

declare global {
    type SupabaseUser = User
    type SupabaseSession = Session
}


declare global {
  type Campaign = Database['public']['Tables']['campaigns']['Row']
  type Keyword = Database['public']['Tables']['keywords']['Row']
  type Campaign_Keyword = Database['public']['Tables']['campaign_keywords']['Row']
  type Campaign_Lead = Database['public']['Tables']['campaign_leads']['Row']
  type RedditPost = Database['public']['Tables']['reddit_posts']['Row']
  type RedditPostInsert = Database['public']['Tables']['reddit_posts']['Insert']
  type Profile = Database['public']['Tables']['profiles']['Row']
}

export {}