import dotenv from 'dotenv';
import path from 'path';

import { logger, schedules } from '@trigger.dev/sdk/v3';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { Redis } from '@upstash/redis';
import fetch from 'node-fetch';

// Load the appropriate env file
dotenv.config({
  path: path.resolve(process.cwd(), '.env.development'),
});

// Initialize Services
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Viral Post System Prompt
const LINKEDIN_SYSTEM_PROMPT = `
You are a world-class ghostwriter for a LinkedIn top voice. Your goal is to write a post that goes viral.
Follow this "Viral Anatomy" strictly:
1. **The Hook:** The first sentence must be punchy, controversial, or a strong "how-to". No fluff. max 15 words.
2. **The Meat:** Short, punchy sentences. Use whitespace (line breaks) generously. No blocks of text.
3. **The Lesson:** Provide actionable advice or a counter-intuitive insight.
4. **The CTA:** End with a question to drive comments.

Tone: Professional but conversational, confident, and human.
Formatting: Do NOT use hashtags in the body. Do NOT use emojis excessively (max 2-3).
`;

export default async function linkedinBot() {
  // 1. Check Cache to avoid repetition
  // We store the last 5 topics in Redis to ensure variety
  const recentTopics = await redis.lrange('linkedin:recent_topics', 0, 4);
  const avoidTopicsString =
    recentTopics.length > 0
      ? `Avoid writing about these recent topics: ${recentTopics.join(', ')}.`
      : '';

  // logger.info(`🔍 Context loaded. Avoiding: ${recentTopics.length} recent topics.`);
  console.log(`🔍 Context loaded. Avoiding: ${recentTopics.length} recent topics.`);

  // 2. Generate Content with Gemini
  // const { text: postContent } = await generateText({
  //   model: google('gemini-3-flash-preview'),
  //   system: LINKEDIN_SYSTEM_PROMPT,
  //   prompt: `Write a fresh LinkedIn post about software engineering, AI automation, or career growth. ${avoidTopicsString}
      
  //     Make it unique and insight-heavy.`,
  // });

  // console.log('📝 Content generated successfully', postContent);

  // // Extract a brief topic summary for cache (first 5 words)
  // const topicSummary = postContent.split(' ').slice(0, 5).join(' ');
  // // logger.info('📝 Content generated successfully', { topic: topicSummary });
  // console.log('📝 topicSummary', { topic: topicSummary });

  // 3. Publish to LinkedIn
  // We need the URN (ID) of the user to post.
  // Ideally, store your URN in env, or fetch it dynamically (shown below).
  const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;



  let personUrn = process.env.LINKEDIN_PERSON_URN;

  // Fetch User Profile ID (URN) if not hardcoded
  if (!personUrn) {
    logger.info('⚠️ No Person URN in env, attempting to fetch...');
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}` },
    });

    if (!profileResponse.ok) {
      // LOG THE REAL ERROR
      const errorBody = await profileResponse.text();
      console.error('LinkedIn Profile Error Body:', errorBody);
      throw new Error(
        `Failed to fetch LinkedIn Profile: ${profileResponse.status} ${profileResponse.statusText}. See logs for details.`,
      );
    }

    const profileData: any = await profileResponse.json();
    personUrn = `urn:li:member:${profileData.id}`;
  }


  // Construct the Post Body (UGC API)
  
  const postBody = {
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: "hello world this is my new post via API hahaha",
        },
        shareMediaCategory: 'NONE', // Text only post
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  // logger.info('🚀 Publishing to LinkedIn...');
  console.log(`🚀 Publishing to LinkedIn as ${personUrn}`);

  const publishResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(postBody),
  });

  if (!publishResponse.ok) {
    const errorText = await publishResponse.text();
    throw new Error(`LinkedIn API Error: ${errorText}`);
  }

  const publishData: any = await publishResponse.json();
  // logger.info('✅ Post Published Successfully!', { id: publishData.id });
  console.log('✅ Post Published Successfully!', { id: publishData.id });

  // 4. Update Cache
  // Push new topic to list and trim to keep only last 5
  // await redis.lpush('linkedin:recent_topics', topicSummary);
  await redis.ltrim('linkedin:recent_topics', 0, 4);

  return {
    success: true,
    postId: publishData.id,
    // content: postContent,
  };
}

linkedinBot();
