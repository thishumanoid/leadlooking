'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useClerk, UserButton } from '@clerk/nextjs';

const DashboardPage = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 relative">
      <div className="absolute top-8 right-8">
        <UserButton />
      </div>

      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="p-3 rounded-full bg-white/5 border border-white/10">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-white/60 mt-4 text-lg">You are securely signed in to your dashboard.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-white"
          >
            Back to Home
          </Button>
          <Button
            onClick={handleSignOut}
            className="w-full sm:w-auto bg-white text-black hover:bg-white/90 font-semibold"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
