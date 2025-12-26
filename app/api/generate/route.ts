import { isEligibleUser } from "@/lib/supabase/helpers";

async function generate(userEmail: string) {
  try {
    const isEligible = await isEligibleUser(userEmail);

    if (isEligible) {
      /// THIS REQUEST IS MADE BY A PREMIUM USER
      /// NOW DO WHATEVER YOU WANT HERE
    }
  } catch (error) {}
}

export async function POST(request: Request) {
  const { userEmail } = await request.json();

  const aiOutput = await generate(userEmail);

  return new Response();
}
