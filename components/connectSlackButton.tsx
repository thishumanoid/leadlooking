'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSubscription } from '@/hooks/subscription';
import { useUser } from '@clerk/nextjs';

export default function ConnectSlackButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { subscription } = useSubscription();
  const { user } = useUser();

  const handleConnect = async () => {
    console.log('subscription: ', user?.id);
    setLoading(true);
    // 1. Call your API to get the Slack Auth URL
    const res = await fetch('/api/slack/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId:  subscription?.user_id }),
    });
    const data = await res.json();

    // 2. Redirect user to Slack
    if (data.url) {
      router.push(data.url);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      {loading ? 'Redirecting...' : 'Connect Slack Workspace'}
    </button>
  );
}
