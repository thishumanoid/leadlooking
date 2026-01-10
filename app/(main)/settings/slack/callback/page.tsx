import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";
import { absoluteUrl } from "@/utils/functions/helpers";

const SlackCallbackPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {

  const { userId } = await auth();
  
  if (!userId) {
    return redirect("/");
  }

  // Get current user details (includes email)
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return redirect("/");
  }
  const { code } = searchParams;

  if (code) {
    const slackRedirectURI = absoluteUrl("/settings/slack/callback");

    const response = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.SLACK_CLIENT_ID ?? "",
        client_secret: process.env.SLACK_CLIENT_SECRET ?? "",
        code,
        redirect_uri: slackRedirectURI.startsWith("http://")
          ? `https://redirectmeto.com/${slackRedirectURI}`
          : slackRedirectURI,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      // Update user in Supabase using either clerk_user_id or email
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ slack_access_token: data.access_token })
        .eq("user_id", userId);

      if (error) {
        console.error("Supabase update error:", error);
        // Handle error appropriately
      } else {
        return redirect("/settings/slack");
      }
    } else {
      console.error("Slack OAuth error:", data.error);
    }
  } else {
    console.error("No code provided");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error connecting to Slack. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SlackCallbackPage;