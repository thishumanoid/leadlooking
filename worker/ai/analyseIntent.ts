import gemini from '@/lib/gemini/geminiClient';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function runGemini() {

  const aiPrompt = createPrompt(
    EXAMPLE_POST_SEEKING.title,
    EXAMPLE_POST_SEEKING.content,
    EXAMPLE_POST_SEEKING.productDescription,
    EXAMPLE_POST_SEEKING.keywords
  );

  console.log('💸 running gemini for:', aiPrompt);

  const { text } = await generateText({
    model: google('gemini-2.5-flash-lite'),
    prompt: aiPrompt,
    system: SYSTEM_PROMPT,
  });

  console.log('👉👉👉: ', text);
}

// System Prompt for Lead Intent Analysis
export const SYSTEM_PROMPT = `You are a lead qualification AI that analyzes Reddit posts to determine if the author is genuinely seeking a solution or merely promoting their own product.

Your task is to:
1. Determine the INTENT of the post author (seeking vs promoting vs discussing) . 
2. Calculate a LEAD SCORE representing how valuable this post is as a potential customer lead. 
3. Extract key information about the author's needs. 

CRITICAL: The lead score measures potential customer value, for example a post promoting a competing product may be topically relevant but has ZERO value as a lead (score: 0-20). 

Only posts where the author is actively seeking help, asking for recommendations, or describing problems they need solved should receive high lead scores (70+). 

Always respond with valid JSON only, no additional text or markdown formatting.`;

export function createPrompt(
  postTitle: string,
  postContent: string,
  productDescription: string,
  keywords: string[]
): string {
  return `Analyze this Reddit post for lead qualification: 

**POST TITLE:**
${postTitle}

**POST CONTENT:**
${postContent}

**PRODUCT/SERVICE DESCRIPTION:**
${productDescription}

**MONITORED KEYWORDS:**
${keywords.join(', ')}

Provide your analysis in the following JSON format:
{
  "intent": "seeking" | "promoting" | "discussing" | "unclear", 
  "leadScore": 0-100, 
  "isBuying": true | false, 
  "urgencyLevel": "low" | "medium" | "high", 
}

Classification Guidelines:
- "seeking": Author is actively looking for a solution, asking for recommendations, or describing a problem they need to solve. 
- "promoting": Author is advertising, showcasing, or promoting their own product/service/blog. 
- "discussing": Author is having a general discussion, sharing opinions, or providing information without seeking or promoting. 
- "unclear": Cannot determine intent from the content. 

Lead Score Guidelines:
The leadScore represents HOW VALUABLE this post is as a POTENTIAL CUSTOMER LEAD for the product, NOT how topically similar it is. 

- 90-100: Excellent lead - Author is actively seeking a solution, has clear needs that match the product, shows buying intent, and urgency. 
- 70-89: Strong lead - Author is seeking help, product is a good fit for their stated needs, moderate buying signals. 
- 50-69: Moderate lead - Author is asking questions or exploring options, product could help but fit is unclear. 
- 30-49: Weak lead - Author mentions the topic but isn't actively seeking, or needs don't align well with product. 
- 0-29: Poor lead - Author is promoting their own solution, just discussing the topic, or product is not a fit. 

IMPORTANT: If intent is "promoting", the leadScore should ALWAYS be 0-20 because they are NOT a potential customer. 
If intent is "discussing" without seeking help, leadScore should be 0-40.
Only "seeking" intent posts should receive scores above 50. 
`;
}

export const EXAMPLE_POST_SEEKING = {
  title: 'Why CRM Stock is Undervalued',
  content: `Hey everyone, I have been watching CRM stock for a few months now since the big sell off. I've always been interested in the stock, but it always traded for a little bit too much of a premium for me personally.

I think that the risk reward has finally changed for the positive and the recent earnings report validated their their pivot to increasing value per seat (licensed user account) rather than selling as many seats as possible to clients as a pure customer relationship manager.

1. Why the stock got crushed

To understand the play, you have to look at why the street hated this name for the last year. The narrative was simple: AI will kill seat expansion and likely shrink it

The Seat Ceiling: The argument was that they saturated the market. You can only hire so many sales reps. Once headcount slows, revenue slows.

M&A Discipline: After Slack/Tableau/Mulesoft, the market viewed them as empire-builders rather than a streamlined SAS play.

Legacy Pricing: The valuation changed from a rising growth monster into a legacy incumbent defending market share.

2. What actually changed

They aren't trying to defend the "seat" model anymore. They are pivoting to a "workflow" model.

Labor vs. Seats: The "Agentforce" rollout changes the unit economics. It’s not a chatbot. They are basically shifting from selling licenses for humans to charging for the "digital labor and value" the software creates. This breaks the correlation between headcount and revenue growth.

The Data Fix: The move to acquire Informatica (data governance) got criticized, but it was necessary. You can't run automation on messy (and incomplete) data. By controlling the data layer, they ensure they are the only viable platform for enterprise automation. It's boring, but it's the moat.

3. The Proof (Where the numbers are heading)

The turnaround is already in the last three earnings reports.

Acceleration Signals: In Q1 through Q3, cRPO (bookings) grew at 12%, 11%, and 11%, consistently outpacing revenue growth (8%, 10%, 9%). When bookings grow faster than revenue, acceleration usually follows.

Margin Expansion: Non-GAAP operating margins expanded: 32.3% → 34.3% → 35.5%. This proves the pivot to upselling on value creation is working.

Traction: Agentforce hit $540M in ARR with 330% YoY growth. They closed 9,500 paid deals in Q3 alone (50% attributed Agentforce as a factor in closing).

4. The Valuation Floor

Even if you doubt real revenue reacceleration, the downside protection is solid.

Cheap relative to history: Trading at a Forward P/E of ~20x and a PEG ratio of sub 1.25

Cash Flow: You are buying in at a ~5.0% - 5.3% FCF yield. The business prints $12B+ in LTM free cash flow.

Buybacks: Management has authorized $22B in remaining buybacks (after already buying back $28B). At current prices, they are reducing the share count by ~1% annually. That puts a mechanical floor under EPS even if the top line stays flat.

5. My 2030 Valuation Scenarios

I modeled this out based on three scenarios.

Bear Case (Target: $165 - $200)

The World: AI adoption stalls, seat growth stays flat.

Numbers: Revenue stagnates at $55B–$58B.

Outcome: Even here, buybacks and 30%+ margins keep EPS around $9.50–$10.50. I applied a compressed 17x-19x multiple.

Base Case (Target: $310 - $380)

The World: Competent execution. The shift to consumption revenue offsets slowing seat growth.

Numbers: Revenue grows to $60B–$65B (well below implied growth based on management guidance). Margins expand to 36%–38%.

Outcome: EPS reaches $13.50–$15.00, trading at a conservative 23x–26x multiple.

Bull Case (Target: $500 - $620)

The World: They become the primary operating layer for enterprise AI workflows.

Numbers: Revenue accelerates to $70B–$75B as data/usage scales.

Outcome: EPS hits $17.50–$19.50. The market re-rates the multiple to 28x-32x (in my opinion very conservative based on top and bottom line growth and historical range).

In my opinion the narrative behind the decline in CRM is the same as what crushed Google and is currently holding ADBE down right now. AI is not killing these businesses and if anything it's a major tailwind. The numbers now show a company pivoting to a higher-margin, consumption-based model.

I took an extremely conservative approach to revenue growth, because there is without a doubt execution risk any time a company of this size pivots its business this heavily. The real upside may end up leaving my bull case in the dust under the right conditions.

With a 5% FCF yield and massive buybacks protecting the downside, I calculate a weighted fair value (price target midpoints integrated with probability % for each case) for 2030 approaching $377.`,
  productDescription:
    'SimpleFlow CRM - An easy-to-use CRM designed for small businesses with Gmail integration, pipeline management, and automated follow-ups. Starting at $49/month.',
  keywords: ['looking for CRM software'],
};

// export async function runGemini(
//   postTitle: string,
//   postContent: string,
//   productDescription: string,
//   keywords: string[]
// ) {
//   const aiPrompt = createPrompt(
//     EXAMPLE_POST_SEEKING.title,
//     EXAMPLE_POST_SEEKING.content,
//     EXAMPLE_POST_SEEKING.productDescription,
//     EXAMPLE_POST_SEEKING.keywords
//   );

//   console.log('💸 running gemini for:', aiPrompt);

//   const response = await gemini.models.generateContent({
//     model: 'gemini-2.5-flash',
//     contents: `${aiPrompt}`,
//     config: {
//       systemInstruction: SYSTEM_PROMPT,
//     },
//   });

//   const aiOutput = response.data;
//   console.log('ai data:', aiOutput);
//   console.log('aiOutput.text: ', response.text);

//   return aiOutput;
// }
