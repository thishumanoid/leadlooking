// scripts/generate-blog.ts
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import slugify from 'slugify';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});


// 1. Define your product context once
const PRODUCT_CONTEXT = `
Name: LeadLooking
Product: It's a tool that finds high-intent Reddit leads everyday. Track keywords, get instant notifications and join conversations where people need exactly what you offer.
Target Audience: Startup founders, indie hackers, developers, small business owners.
Key Features: keyword tracking, instant alerts, high-intent leads.
Tone: Helpful, technical but accessible, slightly informal.
`;

async function main() {
  console.log('🤖 AI Agent starting...');

  // 2. Generate a Topic first (avoids repetition)
  const { text: topic } = await generateText({
    model: google('gemini-2.5-flash'), // Cost-effective and fast
    prompt: `
      Based on this product: ${PRODUCT_CONTEXT}
      Generate a single, high-potential SEO blog post title.
      Focus on "How to", "Best practices", or "Tools for" related to marketing/lead generation/sales.
      Do NOT wrap in quotes. Just the title.
    `,
  });

  const cleanTitle = topic.trim().replace(/^"|"$/g, '');
  const slug = slugify(cleanTitle, { lower: true, strict: true });
  const filename = `${slug}.mdx`;
  const filepath = path.join(process.cwd(), 'content', 'blogs', filename);

  console.log(`📝 Topic Selected: ${cleanTitle}`);

  // 3. Generate the Content
  const { text: content } = await generateText({
    model: google('gemini-2.5-flash'), // Smarter model for long-form writing
    prompt: `
      You are an expert SEO content writer. Write a comprehensive blog post about: "${cleanTitle}".
      
      Product Context to weave in naturally: ${PRODUCT_CONTEXT}
      
      Strict Requirements:
      1. Use MDX format.
      2. Include a Frontmatter block at the very top with: title, description, date (YYYY-MM-DD), and tags.
      3. Use H2 and H3 headers for structure.
      4. The content must be valuable and actionable, not just a sales pitch.
      5. Mention "LeadLooking" naturally 2-3 times as a solution.
      6. Length: 800-1200 words.
      
      Output ONLY the raw MDX content. No markdown code blocks like \`\`\`mdx.
    `,
  });

  // 4. Save the file
  // Ensure directory exists
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Strip potential markdown code fences if Gemini adds them
  const cleanContent = content.replace(/^```mdx\n|```$/g, '').replace(/^```markdown\n|```$/g, '');
  
  fs.writeFileSync(filepath, cleanContent);
  console.log(`✅ Blog post saved to: ${filepath}`);
}

main().catch(console.error);