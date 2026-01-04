'use client';

// docs: https://extfast-docs.hashnode.space/docs/emails/resend-email-setup

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setEmail('');
      setMessage('');

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center  w-full p-6">
        <div className="w-full max-w-lg mx-auto p-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Any Feedback?</h2>
            <p className="text-muted-foreground">
              Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-6 mt-3">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="pl-11 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Write your feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'loading'}
                rows={15}
                className="resize-none"
              />
            </div>

            {status === 'success' && (
              <Alert className="border-green-500/50 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Message sent successfully! I'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert className="border-destructive-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-destructive-600" />
                <AlertDescription className="text-destructive-600">{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button
              type="button"
              className="w-full"
              disabled={status === 'loading'}
              onClick={handleSubmit}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
