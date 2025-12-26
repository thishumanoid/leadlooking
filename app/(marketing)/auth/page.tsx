'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import supabase from '@/lib/supabase/supabaseClient';
import GoogleIcon from '@/components/ui/googleIcon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_SUCCESS_URL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  }

  async function performAction() {
    if (loginMode) {
      await handleLogin();
    } else {
      handleRegister();
    }
  }

  async function handleRegister() {
    if (!email || !password) return;

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_AUTH_SUCCESS_URL,
        },
      });

      if (data) {
        push('/auth/verify-email');
      }

      console.log('register data:', data, error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (!email || !password) return;

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (data.session) {
        push('/dashboard');
      }

      console.log('login data:', data, error);
    } finally {
      setLoading(false);
    }
  }

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <MaxWidthWrapper className="mb-40 mt-10">
      <AnimationContainer delay={0.1}>
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold">
                {loginMode ? 'Log in to your account' : 'Create Your Account'}
              </h1>
              <p className="text-muted-foreground"></p>
            </div>

            <div className="space-y-5">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-2.5">
                    <Input
                      id="email"
                      className="peer ps-9"
                      placeholder="your@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <Mail size={16} aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative mt-2.5">
                    <Input
                      id="password"
                      className="ps-9 pe-9"
                      placeholder="Enter your password"
                      type={isVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <Lock size={16} aria-hidden="true" />
                    </div>
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff size={16} aria-hidden="true" />
                      ) : (
                        <Eye size={16} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button loading={loading} onClick={performAction} className="w-full">
                {loginMode ? 'Sign in' : 'Sign Up'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-10 justify-center gap-2"
              >
                <GoogleIcon className="h-4 w-4" />
                Continue with Google
              </Button>

              <div className="text-center text-sm">
                {!loginMode ? 'Aleardy have an account? ' : "Don't have an account? "}
                <a
                  onClick={loginMode ? () => setLoginMode(false) : () => setLoginMode(true)}
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  {!loginMode ? 'Login' : 'Sign Up'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}
