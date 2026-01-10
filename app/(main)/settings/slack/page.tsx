import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NotConnected from './notConnected';
import { getSlackChannels } from '@/app/actions/slack';
import Connected from './connected';
import { postTestMessage } from '@/app/actions/slack';
import { useSubscription } from '@/hooks/subscription';
import { auth, currentUser } from "@clerk/nextjs/server";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";

const SlackPage = async () => {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    console.log("No user found");
    return;
  }

  const user = await supabaseAdmin.from("profiles").select("*").eq("user_id", userId).single();

  console.log(user)

  const channels = await getSlackChannels(user?.data?.slack_access_token ?? '');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Slack</CardTitle>
          <CardDescription>Slack integration</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.data?.slack_access_token ? (
            <div className="flex flex-col gap-4">
              <Connected channels={channels} defaultChannelId={user.data.slack_channel_id ?? ''} />
            </div>
          ) : (
            <NotConnected />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlackPage;
