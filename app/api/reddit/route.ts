// import { analysePost } from '@/worker/ai/analysePost';
import runReddit from '@/worker/redditScrapper';
// import { exampleKeywordGenerator } from '@/worker/ai/generateKeywords';
// import { sendLeadEmail } from '@/worker/email/mailtrap';

export async function POST(request: Request) {
  console.log('🔥recived api request');

  await runReddit();


  // await exampleKeywordGenerator()

  return new Response();
}
