'use client';

import { MousePointerClick, User, ThumbsUp, Mail } from 'lucide-react';

export default function GuideAfterPayment() {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Steps Card */}
        <div className="bg-card rounded-lg shadow-lg border border-border p-8 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Next Steps</h2>

          {/* Step 1 */}
          <div className="flex gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <MousePointerClick className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Step 1: Lorem ipsum dolor sit
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <User className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Step 2: Lorem ipsum dolor sit</h3>
              <p className="text-muted-foreground mb-3">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <ThumbsUp className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Step 3: Lorem ipsum dolor sit
              </h3>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Card */}
        <div className="bg-accent/10 rounded-lg p-6 mb-6 border-accent">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Having Issues?
          </h3>
          <p className="text-foreground text-sm">
            If your premium plan isn't showing up after following these steps, <br /> please mail
            me: <strong>your@email.com</strong> i am free all day :)
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p>
            Need help?{' '}
            <a className="text-primary font-medium" href="/feedback">
              click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
