'use client';

import React, { useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PlanConfig {
  level: string;
  id?: string;
  name: string;
  price: string;
  isSubscription?: boolean;
  period: string;
  isPopular?: boolean;
  buttonText: string;
  features: PricingFeature[];
}

const planConfig: PlanConfig[] = [
  {
    level: 'pro',
    name: 'Pro',
    id: process.env.NEXT_PUBLIC_POLAR_PRODUCT_A,

    price: '$14',
    isSubscription: true,
    period: '/month',
    isPopular: true,
    buttonText: 'Get Premium',
    features: [
      { text: 'Find Unlimited Leads', included: true },
      { text: '5 Keywords Tracking', included: true },
      { text: '1 active campaign', included: true },
      { text: 'Email notifications', included: true },
      { text: '24/7 Support', included: true },
    ],
  },
];

export default function PricingCards() {
  const router = useRouter();
  const [activePlans] = useState<PlanConfig[]>(planConfig);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const { isSignedIn, user } = useUser();

  const handleClick = async (plan: PlanConfig) => {
    if (!isSignedIn) {
      router.push('/sign-up');
      return;
    }

    if (plan.id) {
      setLoadingPlanId(plan.level);

      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: plan.id,
            userEmail: user.emailAddresses[0].emailAddress,
            userId: user?.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate checkout link');
        }

        const data = await response.json();

        console.log('checkout api response: ', data);

        if (data.checkout_url) {
          router.push(data.checkout_url);
        }
      } catch (error) {
        console.error('Error generating checkout link:', error);
      } finally {
        setLoadingPlanId(null);
      }
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-12 mt-15 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Simple pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Manually finding leads on Reddit is hard. Automate it.
        </p>
      </div>

      <div
        className={`
          grid gap-8 px-4
          ${
            activePlans.length === 1
              ? 'grid-cols-1 max-w-md mx-auto'
              : activePlans.length === 2
              ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }
        `}
      >
        {activePlans.map((plan) => (
          <div
            key={plan.level}
            className={`
              relative flex flex-col overflow-hidden rounded-xl border bg-transparent p-6 shadow-sm transition-all duration-200 hover:shadow-md
              ${
                plan.isPopular
                  ? 'border-primary shadow-primary/10 ring-1 ring-primary'
                  : 'border-border'
              }
            `}
          >
            {plan.isPopular && (
              <div className="absolute right-0 top-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}

            {/* Header */}
            <div className="mb-5">
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              {/* <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p> */}
            </div>

            {/* Price */}
            <div className="mb-5 flex items-baseline">
              <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
              <span className="ml-1 text-sm font-medium text-muted-foreground">{plan.period}</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleClick(plan)}
              disabled={loadingPlanId === plan.level}
              className={`
                mb-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  plan.isPopular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }
              `}
            >
              {loadingPlanId === plan.level ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                plan.buttonText
              )}
            </button>

            {/* Divider */}
            <div className="mb-6 h-px w-full bg-border" />

            {/* Features List */}
            <ul className="flex flex-1 flex-col gap-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm">
                  {feature.included ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <X className="h-3 w-3" />
                    </div>
                  )}
                  <span
                    className={
                      feature.included
                        ? 'text-foreground'
                        : 'text-muted-foreground line-through decoration-muted-foreground/50'
                    }
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
