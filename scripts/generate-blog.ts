// scripts/generate-blog.ts
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import slugify from 'slugify';
import {
  getTitleGenerationPrompts,
  getContentGenerationPrompts,
  BlogBriefSchema,
  BlogPostSchema,
} from './prompts';

const CACHE_FILE = path.join(process.cwd(), 'blog-cache.json');

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || 'AIzaSyC--cS6PaB5S0EC6s_idnC60uM3cQn1c7Q',
});

function readCache(): { generatedTitles: string[] } {
  if (!fs.existsSync(CACHE_FILE)) {
    return { generatedTitles: [] };
  }
  return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
}

// Write to cache
function writeCache(cache: { generatedTitles: string[] }) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function addToCache(title: string) {
  const cache = readCache();
  if (!cache.generatedTitles.includes(title)) {
    cache.generatedTitles.push(title);
    writeCache(cache);
  }
}

async function main() {
  console.log('🤖 AI Agent starting...');

  const cache = readCache();
  console.log('Cache: ', cache);

  // 2. Generate a Topic first (avoids repetition)
  const titlePrompts = getTitleGenerationPrompts(cache.generatedTitles);

  console.log('🤔 Generating Topic Brief...');
  const { object: topicBrief } = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: BlogBriefSchema,
    prompt: titlePrompts.user,
    system: titlePrompts.system,
  });

  const cleanTitle = topicBrief.title.trim();
  const slug = slugify(cleanTitle, { lower: true, strict: true });
  const filename = `${slug}.mdx`;
  const filepath = path.join(process.cwd(), 'content', 'blogs', filename);

  console.log(`📝 Topic Selected: ${cleanTitle}`);
  console.log(`🎯 Strategy: Ranking for "${topicBrief.primaryKeyword}"`);

  // 3. Generate the Content with structured output
  const contentPrompts = getContentGenerationPrompts(topicBrief);

  console.log('✍️ Writing Blog Post...');
  const { object: blogPost } = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: BlogPostSchema,
    prompt: contentPrompts.user,
    system: contentPrompts.system,
  });

  // 4. Construct the Final File Content
  let description = blogPost.description;
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const finalContent = `---
title: '${blogPost.title.replace(/'/g, "''")}'
description: "${description.replace(/"/g, '\\"')}"
date: ${new Date().toISOString().split('T')[0]}
tags:
  [
${blogPost.tags.map((tag) => `    '${tag}'`).join(',\n')}
  ]
---

${blogPost.markdownContent}
`;

  // 5. Save the file
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filepath, finalContent);
  console.log(`✅ Blog post saved to: ${filepath}`);

  // 6. Update Cache (Only after successful generation)
  addToCache(cleanTitle);
  console.log(`💾 Added "${cleanTitle}" to cache.`);
}

main().catch(console.error);
