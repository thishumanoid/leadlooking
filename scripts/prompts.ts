import { z } from 'zod';

// Define the Zod schema for the Blog Brief
export const BlogBriefSchema = z.object({
  title: z.string().describe('The main blog title, keyword-rich and compelling.'),
  primaryKeyword: z.string().describe('The exact primary keyword phrase to target.'),
  estimatedMonthlySearches: z.string().describe('Rough estimate of monthly searches.'),
  competitionLevel: z.enum(['Low', 'Medium', 'High']).describe('SEO competition level.'),
  searchIntent: z.string().describe("The user's intent behind the search."),
  targetAudience: z.string().describe('Who this blog post is for.'),
  whyThisWillRank: z.array(z.string()).describe('List of reasons why this content will rank.'),
  contentAngle: z.string().describe('The unique perspective or angle.'),
  keySections: z.array(z.string()).describe('List of main section headers or points to cover.'),
  leadLookingIntegration: z
    .string()
    .describe('How to naturally mention LeadLooking in the conclusion.'),
});

// Define the Zod schema for the Final Blog Post Content
export const BlogPostSchema = z.object({
  title: z.string().describe('The final SEO-optimized title.'),
  description: z.string().describe('SEO meta description, ideally under 160 chars.'),
  tags: z
    .array(z.string())
    .describe('List of 5-8 relevant tags including broad and specific keywords.'),
  markdownContent: z
    .string()
    .describe(
      'The full blog post content in Markdown format. formatted with proper H2, H3 headings, bold text, lists, and links.',
    ),
});

export function getTitleGenerationPrompts(existingTitles: string[] = []) {
  const system = `You are an expert SEO researcher and content strategist specializing in SaaS marketing. Your job is to identify high-potential, low-competition blog topics that will drive organic traffic and attract potential customers.

**Your Goal:**
Analyze current search trends to generate ONE high-potential blog topic.

**LeadLooking Context:**
- Automates Reddit monitoring for specific keywords.
- Finds "warm leads" (people asking for solutions).
- Target Audience: SaaS founders, indie hackers, B2B sales, marketing pros.

**Title Criteria:**
- Keyword volume: 500-5000/mo.
- MUST be actionable and solve a real pain point.
- Low to Medium competition.

${existingTitles.length > 0 ? `\n**CRITICAL EXCLUSIONS:**\nDo NOT generate any of these existing titles:\n${existingTitles.map((t) => `- ${t}`).join('\n')}\n` : ''}
`;

  const user = `Generate one high-potential, SEO-optimized blog title and brief.
Focus Area: Reddit marketing, finding early customers, B2B sales automation, or indie hacker growth strategies.
Ensure the topic has clear commercial intent.`;

  return { system, user };
}

export function getContentGenerationPrompts(brief: z.infer<typeof BlogBriefSchema>) {
  const system = `You are an expert SEO content writer. Your task is to write a comprehensive, high-ranking blog post based on the provided brief.

**Writing Guidelines:**
- **Tone:** Professional, authoritative, yet conversational and encouraging.
- **Structure:** Use H2s for main sections, H3s for subsections. Short paragraphs.
- **SEO:** Use the primary keyword naturally in the first 100 words and H2s.
- **Value:** Be extremely actionable. No fluff. Give specific examples.
- **LeadLooking Integration:** Mention LeadLooking ONLY in the conclusion as a helpful tool.

**Output Requirements:**
- The 'markdownContent' field must contain the ENTIRE body of the post (Introduction, H2s, Conclusion, etc.).
- Do NOT include the frontmatter in the 'markdownContent'; it will be added programmatically.
`;

  const user = `Write the blog post based on this brief:

**Title:** ${brief.title}
**Target Audience:** ${brief.targetAudience}
**Primary Keyword:** ${brief.primaryKeyword}
**Intent:** ${brief.searchIntent}
**Angle:** ${brief.contentAngle}

**Key Sections:**
${brief.keySections.map((s) => `- ${s}`).join('\n')}

**Integration Plan:** ${brief.leadLookingIntegration}

Make it 1500-2000 words. Comprehensive and detailed.`;

  return { system, user };
}
