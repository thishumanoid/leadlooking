'use client';

import { CheckCircle2, Sparkles, Zap } from 'lucide-react';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';

export default function AuthSuccess() {
  const user = false;
  
  return (
    <MaxWidthWrapper className="mb-12">
      {user && (
        <div className="justify-center p-4">
          <div className="max-w-2xl w-full mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="w-16 h-16 text-muted-foreground" />
                </div>
              </div>
              <h1 className="text-4xl text-muted-foreground font-medium">
                Successfully Logged In!
              </h1>
            </div>

            <div className="bg-gradient-to-br bg-primary/10 border border-primary/30 rounded-lg p-6 space-y-4 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Upgrade to Premium</h2>
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex gap-4 mt-6">
                <Link href={'/dashboard'} className="flex-1">
                  <button className="w-full outline-1 outline-foreground/40 hover:bg-secondary/80 text-secondary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
                    Dashboard
                  </button>
                </Link>
                <Link href={'/pricing'} className="flex-1">
                  <button className="w-full bg-gradient-to-r bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
                    Upgrade Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="space-y-4 mt-2">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Open the Extension</h3>
                    <p className="text-muted-foreground">
                      Click on the extension icon in your Chrome toolbar (top-right corner of your
                      browser)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Verify Login Status</h3>
                    <p className="text-muted-foreground">
                      Check if you're logged in within the extension popup
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center  ">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Start Generating</h3>
                    <p className="text-muted-foreground">
                      Navigate to any LinkedIn post and start generating AI-powered comments
                      instantly!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
