'use client';

import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const { push } = useRouter();

  const handleClick = () => {
    push('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border shadow-lg p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h1>

            <p className="text-muted-foreground mb-6">
              We've sent a verification link to your email address. Click on the link to verify your
              account and get started.
            </p>

            <div className="w-full space-y-4">
              <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                <p>Didn't receive the email? Check your spam folder</p>
              </div>

              <Button variant="ghost" className="w-full" onClick={handleClick}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help?{' '}
          <a href="/feedback" className="text-primary hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
