'use client';

import { createContext, useContext, useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
import { useSupabase } from './supabase-provider';
import { Tables } from '@/types/supabaseTypes';

type Profile = Tables<'profiles'>;

type SubscriptionContextType = {
  subscription: Profile | null;
  isLoading: boolean;
  isPremium: boolean;
};

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: null,
  isLoading: true,
  isPremium: false,
});

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const user = {emailAddresses: [{emailAddress: 'test@gmail.com', id: 'test', verified: true }]}
  const { supabase, isLoaded: isSupabaseLoaded } = useSupabase();
  const [subscription, setSubscription] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      // if (!isUserLoaded || !isSupabaseLoaded || !user) {
      //   if (isUserLoaded && !user) {
      //     setIsLoading(false);
      //   }
      //   return;
      // }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.emailAddresses[0].id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching subscription:', error);
        } else {
          setSubscription(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching subscription:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const isPremium =
    subscription?.subscription_status === 'active' ||
    subscription?.subscription_status === 'trialing';

  return (
    <SubscriptionContext.Provider value={{ subscription, isLoading, isPremium }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
