import type { User, Session } from "@supabase/supabase-js";

declare global {
    type SupabaseUser = User
    type SupabaseSession = Session
}

export {}