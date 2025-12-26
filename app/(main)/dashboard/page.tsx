'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const DashboardPage = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-medium">Welcome {user?.email}!</h1>
      <p className="text-gray-500 mt-2">You are signed in.</p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button onClick={() => router.push('/')} variant="outline">
          Back to home
        </Button>
        <Button onClick={() => logout()}>Sign Out</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
