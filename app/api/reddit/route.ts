// import { analysePost } from '@/worker/ai/analysePost';
import runReddit from '@/worker/redditScrapper';
import { exampleKeywordGenerator } from '@/worker/ai/generateKeywords';
// import { sendLeadEmail } from '@/worker/email/mailtrap';
import { scrapeMetadata } from '@/utils/functions/scrapeMetadata';

export async function POST(request: Request) {
  
  const { websiteUrl } = await request.json();

  const metadata = await scrapeMetadata(websiteUrl);

  const keywords = await exampleKeywordGenerator(metadata?.description || '');


  await runReddit();


  // await exampleKeywordGenerator()

  return new Response();
}
