'use client';

import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase/supabaseClient';

type AuthContextType = {
  user: SupabaseUser | undefined;
  session: SupabaseSession | undefined
  loading: boolean;
  logout: () => Promise<{ error: Error | null }>;
};

type AuthProviderProp = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('put AuthProvider at the top in you App.jsx component');
  }

  return context;
}


export function AuthProvider({ children }: AuthProviderProp) {
  const [user, setUser] = useState<SupabaseUser | undefined>(undefined);
  const [session, setSession] = useState<SupabaseSession | undefined>(undefined)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((eventName, session) => {
      console.log('supabase event', eventName, session);

      if (eventName === 'INITIAL_SESSION' && session?.user) {
          setUser(session.user);
          setSession(session)
      } else if (eventName === 'SIGNED_IN' && session?.user) {
          setUser(session?.user);
          setSession(session)
      } else if (eventName === 'SIGNED_OUT') {
        setUser(undefined)
        setSession(undefined)
      }
    });
  }, []);

  const value = {
    user,
    session,
    loading,
    logout: () => supabase.auth.signOut()
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
