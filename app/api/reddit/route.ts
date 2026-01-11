// import { analysePost } from '@/worker/ai/analysePost';
import runReddit from '@/worker/redditScrapper';
import { exampleKeywordGenerator } from '@/worker/ai/generateKeywords';
// import { sendLeadEmail } from '@/worker/email/mailtrap';
import { scrapeMetadata } from '@/utils/functions/scrapeMetadata';

import { sendSlackNotification } from '@/worker/notifications/slack';

export async function POST(request: Request) {
  // const { websiteUrl } = await request.json();

  // const metadata = await scrapeMetadata(websiteUrl);

  // const keywords = await exampleKeywordGenerator(metadata?.description || '');

  // await runReddit();

  await sendSlackNotification('user_386Q5mG9IOTH7OIZsmgJOnJw5SP', 'hello darling');

  // await exampleKeywordGenerator()

  return new Response();
}
