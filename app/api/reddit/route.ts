// import runGemini from "@/worker/ai/analyseIntent";
import { analysePost } from '@/worker/ai/analyseIntent';
import runReddit from '@/worker/redditScrapper';

export async function POST(request: Request) {

  console.log('🔥recived api request');

  // await runGemini();

  await runReddit()

  return new Response();
}
