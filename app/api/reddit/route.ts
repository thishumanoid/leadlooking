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

  await sendSlackNotification(
    'xoxb-9116087813666-10285502844337-wxvEgNzvAibrp9BxYaAvVe5G',
    'C093E2L0L3U',
    [
      {
        title: 'AI generated image… You too can join the crowd of fake posts with the below prompt! 🥳',
        subreddit: 'Test',
        url: 'https://www.reddit.com/r/microsaas/comments/1q9f29b/in_just_a_few_minutes_i_created_a_successful_saas/',
        leadScore: 58,
        content: 'This is a really long test content',
        createdAt: new Date(),
      },
      {
        title: 'This is a really long test title two',
        subreddit: 'Test Two',
        url: 'https://www.reddit.com/r/chrome_extensions/comments/1q9uy91/i_spent_my_entire_night_making_an_ad_for_silly/',
        leadScore: 1,
        content: 'This is a really long test content two',
        createdAt: new Date(),
      },
    ],

    '8f81c891-3f1d-43cd-b6c2-5eb6cc96a205'
  );

  // await exampleKeywordGenerator()

  return new Response();
}
