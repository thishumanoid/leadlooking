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
      <div className="flex items-center justify-center w-full py-12 px-6">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-3 text-center">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Send Us Your Feedback
            </h2>
            <p className="text-muted-foreground text-lg">
              We'd love to hear from you! Share your thoughts, suggestions, or report any issues.
            </p>
          </div>

          {/* Form Card */}
          <div className="border rounded-lg p-8 shadow-lg bg-card/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold"
                >
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="pl-11 h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold "
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind... We value your feedback!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  rows={5}
                  className="resize-none min-h-[200px] text-base leading-relaxed"
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
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Button
                type="button"
                className="w-full h-12 text-base font-semibold"
                disabled={status === 'loading'}
                onClick={handleSubmit}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Your Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          </div>

          {/* Direct Email Contact Card */}
          <div className="border rounded-lg p-6 bg-muted/30 backdrop-blur-sm">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Prefer Email?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                If the form isn't working, you can reach us directly at:
              </p>
              <a
                href="mailto:neuhiman@gmail.com"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-base"
              >
                neuhiman@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
