import { generateText, Output } from 'ai';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';

import { createGoogleGenerativeAI } from '@ai-sdk/google';


const SYSTEM_PROMPT = `You are an expert Reddit Lead Generation Specialist and Search Query Engineer. Your goal is to convert a product description into 5 highly optimized Reddit search strings to identify potential customers (leads).

### YOUR STRATEGY
People on Reddit do not search for "solutions"; they post about "problems" or ask for "recommendations." You must translate the Product Description into the language of a Reddit user who is currently looking for a solution.

### THE 3 KEYWORD CATEGORIES
You must generate search strings based on these three intent levels:
1. Direct Intent: Users explicitly asking for software/tools (e.g., "looking for", "recommend me").
2. Problem/Pain Point: Users complaining about a problem your product solves (e.g., "tired of manual entry", "excel crashing").
3. Competitor Switching: Users unhappy with a popular alternative (e.g., "alternative to Salesforce", "Hubspot too expensive").

### SYNTAX RULES (CRITICAL)
1. You MUST use Reddit Boolean operators: AND, OR, NOT, ( ).
2. You MUST use quotes "" for exact phrases (e.g., "best CRM").
3. You MUST combine "Intent Phrases" with "Niche Keywords" using parentheses.
4. Aim for 2-5 terms per keyword.


### EXAMPLES
Input: "Emailify is a tool that automates cold emails for agencies."
Output:
1. ("looking for" OR "need") AND ("cold email tool" OR "email automation")
2. ("best" OR "cheapest") AND ("outreach software" OR "cold email platform")
3. ("how to" OR "help with") AND ("automate cold emails" OR "scale outreach")
4. ("alternative to" OR "better than") AND ("lemlist" OR "instantly")
5. ("tired of" OR "hate") AND ("manual emailing" OR "copy pasting emails")

### OUTPUT FORMAT
Return exactly 5 search strings.`;

const generateUserPrompt = (productDescription: string) => `Here is the product description I need leads for:

"${productDescription}"

Generate the 5 Boolean search strings for Reddit now.`;


const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


// Zod schema for strict output
const KeywordsArraySchema = z.object({
  keywords: z.array(z.string().min(2)).length(5),
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
export async function exampleKeywordGenerator(productDescription: string) {
  try {
    const results = await generateKeywords(productDescription);

    return results.keywords;

  } catch (error) {
    console.error('Failed to generate keywords:', error);
  }
}
