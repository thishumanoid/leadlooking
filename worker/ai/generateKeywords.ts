import { generateText, Output } from 'ai';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';

import { createGoogleGenerativeAI } from '@ai-sdk/google';


// System prompt for consistent behavior
const SYSTEM_PROMPT = `You are a Reddit search optimization expert specializing in lead generation queries. Your role is to generate highly targeted search keywords that identify potential customers on Reddit who are actively seeking solutions.

Search Operators You Can Use:
1. "" (quotes) - For exact phrase matching
2. AND - To require multiple terms appear together
3. OR - For alternative/synonym terms
4. () - To group terms logically

Keyword Construction Rules:
- Each keyword must be 2-4 words maximum
- Focus on intent-based queries (people actively looking for solutions)
- Each keyword should strategically use at least one search operator
- Each keyword should target a different user intent or pain point

Intent Signals to Target (examples):
- Direct seeking: "looking for", "need", "searching for"
- Recommendations: "recommend", "suggestion", "best"
- Problems: "help with", "struggling with", "issue with"
- Alternatives: "alternative to", "better than", "instead of"
- Comparisons: "vs", "or", "compared to"
- Questions: "anyone know", "where can I", "how to find"

Quality Standards:
- Avoid overly broad single-word terms (e.g., just "software")
- Prioritize commercial intent over purely informational queries
- Each keyword should be distinct and not repetitive
- Ensure keywords would realistically appear in Reddit posts`;

const generateUserPrompt = (productDescription: string) => `
Product/Service Description:
"${productDescription}"

Generate exactly 5 optimized Reddit search keywords for finding potential customers interested in this product/service.

Key Requirements:
1. Each keyword: 2-4 words max (excluding operators like AND, OR, quotes)
2. Must strategically use Reddit search operators (quotes, AND, OR, parentheses)
3. Focus on high buying intent and pain points
4. Use different operators across keywords for variety
5. Target different customer needs/scenarios
6. Make them realistic - think about actual Reddit post language

Good Examples:
- "looking for" waitlist
- need AND "waitlist"
- "best waitlist" validate idea
- waitlist OR "email collection"
- "recommend a" waitlist

Bad Examples (avoid these):
- waitlist (too generic, no operator)
- "enterprise email collection and lead generation platform solution" (too long)
- collect emails (no operator used)

Generate 5 distinct, high-quality keywords that will catch real Reddit users actively seeking this type of solution.`;


const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


// Zod schema for strict output
const KeywordsArraySchema = z.object({
  keywords: z.array(z.string().min(5).max(50)).length(5),
});

export async function generateKeywords(
  productDescription: string
): Promise<z.infer<typeof KeywordsArraySchema>> {
  const aiPrompt = generateUserPrompt(productDescription);

  const { output } = await generateText({
    model: google('gemini-2.5-flash'),
    output: Output.object({
      schema: KeywordsArraySchema,
    }),
    prompt: aiPrompt,
    system: SYSTEM_PROMPT,
  });

  return output;
}

// Type export for use in other files
export type GeneratedKeywords = z.infer<typeof KeywordsArraySchema>;

// Example usage
export async function exampleKeywordGenerator() {
  try {
    const PRODUCT_DESCRIPTION =
      'Drag-and-drop website builder for small businesses. Create professional websites without coding. Includes hosting, SSL, mobile optimization, and SEO tools. 100+ customizable templates.';
    const results = await generateKeywords(PRODUCT_DESCRIPTION);
    console.log('keywords', results.keywords);

  } catch (error) {
    console.error('Failed to generate keywords:', error);
  }
}
