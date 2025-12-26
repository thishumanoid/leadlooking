import { createGroq } from '@ai-sdk/groq';
import { generateText, Output } from 'ai';
import { z } from 'zod';



const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
});

const LeadAnalysisSchema = z.object({
  intent: z
    .enum(['seeking', 'promoting', 'discussing', 'unclear'])
    .describe(
      'The primary intent of the author. "seeking" = looking for solutions/help. "promoting" = selling/showcasing their own product. "discussing" = general chat.'
    ),
  leadScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Value (0-100) as a potential customer. CRITICAL: If intent is "promoting" or "discussing", this MUST be under 30. Only "seeking" posts with high fit get 70+.'
    ),
  isBuying: z
    .boolean()
    .describe('Does the author show active buying signals or intent to purchase?'),
  urgencyLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('How urgently does the author need a solution?'),
});

export async function analysePost(
  title: string,
  content: string,
  productDescription: string,
  keywords: string[]
) {
  const aiPrompt = createPrompt(title, content, productDescription, keywords);

  console.log('💸 running AI for:', aiPrompt);

  const { output } = await generateText({
    model: groq('openai/gpt-oss-120b'),
    output: Output.object({
      schema: LeadAnalysisSchema,
    }),
    prompt: aiPrompt,
    system: SYSTEM_PROMPT,
  });


  return output
}

// PROMPT CREATION
export const SYSTEM_PROMPT = `You are a lead qualification AI that analyzes Reddit posts to determine if the author is genuinely seeking a solution or merely promoting their own product.

**YOUR EVALUATION LOGIC:**

1.  **INTENT CLASSIFICATION:**
    * **Seeking:** Author actively needs a solution/recommendation. (High Value)
    * **Promoting:** Author is advertising their own stuff. (Zero Value)
    * **Discussing:** General chatter, news, or opinions. (Low Value)

2.  **SCORING RULES (CRITICAL):**
    * **0-20 (No Lead):** Intent is "promoting" OR product is completely irrelevant.
    * **21-49 (Weak):** Intent is "discussing" or "unclear", or needs don't align well.
    * **50-69 (Moderate):** Asking questions/exploring, but fit isn't perfect.
    * **70-100 (Strong/Excellent):** Actively seeking help ("seeking"), clear pain points, and perfect fit for our product description.

**IMPORTANT:**
* Be cynical. If a post looks like a "stealth promotion", mark it as "promoting" with a score of 0.
`;

export function createPrompt(
  postTitle: string,
  postContent: string,
  productDescription: string,
  keywords: string[]
): string {
  return `
--- START POST ANALYSIS ---
**PRODUCT WE ARE SELLING:**
${productDescription}

**KEYWORDS WE ARE TRACKING:**
${keywords.join(', ')}

**REDDIT POST TO ANALYZE:**
Title: ${postTitle}
Content:
${postContent}
--- END POST ANALYSIS ---
`;
}


