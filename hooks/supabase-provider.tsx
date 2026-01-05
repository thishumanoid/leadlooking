'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';
import { Database } from '@/types/supabaseTypes';
import { DashboardSkeleton } from '@/components/global/app-skeleton';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  isLoaded: boolean;
};

const Context = createContext<SupabaseContext>({
  supabase: null!,
  isLoaded: false,
});

type Props = {
  children: React.ReactNode;
};

export default function SupabaseProvider({ children }: Props) {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!session) return;

    const client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        accessToken: () => session?.getToken(),
      }
    );

    setSupabase(client);
    setIsLoaded(true);
  }, [session]);

  return (
    <Context.Provider value={{ supabase: supabase!, isLoaded: isLoaded }}>
      {!isLoaded ? <DashboardSkeleton /> : children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return {
    supabase: context.supabase,
    isLoaded: context.isLoaded,
  };
};
