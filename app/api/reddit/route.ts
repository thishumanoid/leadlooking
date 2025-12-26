import runReddit from '@/worker/redditScrapper';
// import runGemini from "@/worker/ai/analyseIntent";
import { runGemini } from '@/worker/ai/analyseIntent';

export async function POST(request: Request) {

  console.log('🔥recived api request');

  await runGemini();

  // await runReddit()

  return new Response();
}
