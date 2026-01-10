interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  chatURL: string;
  subreddit: string;
  created_utc: number;
  url: string;
  permalink: string;
  score: number;
  num_comments: number;
  matchedKeyword: string;
}

interface PostScore {
  post: RedditPostInsert;
  productDescScore: number;
  intentScore: number;
  negativeScore: number;
  finalScore: number;
  passed: boolean;
  reasons: string[];
}

interface FilterConfig {
  productDescription: string;

  weights: {
    productDesc: number;
    intent: number;
    negative: number;
  };

  // Minimum score to pass (0-1 scale)
  threshold: number;

  // Enable debug mode to see scores
  debug?: boolean;
}

class RedditLeadFilter {
  private config: FilterConfig;
  private productTerms: string[]; // Extracted terms from product description

  // Intent phrases that indicate someone is looking for a solution
  private readonly INTENT_PHRASES = [
    'looking for',
    'need',
    'recommend',
    'recommendation',
    'suggest',
    'suggestion',
    'help me find',
    'what should i',
    'which',
    'what',
    'what is',
    "what's",
    'best',
    '?',
    'anyone know',
    'does anyone',
    'can someone',
    'searching for',
    'in search of',
    'trying to find',
    'where can i',
    'how do i find',
    'alternative to',
    'better than',
    'instead of',
    'replace',
    'switch from',
    'migrate from',
    'moving from',
    'advice on',
    'tips for',
    'guidance',
    'should i use',
    'worth it',
    'comparison',
    'vs',
    'versus',
    'compare',
    'evaluate',
    'evaluating',
    'considering',
    'thinking about',
    'planning to',
    'about to',
    'going to use',
    'help choosing',
    'help picking',
    'help selecting',
    'feedback on finding',
    'options for',
    'solutions for',
    'tools for',
    'software for',
    'platform for',
    'service for',
    "what's the best",
    'what is the best',
    'top',
    'favorite',
    'preferred',
    'must have',
    'essential',
    'struggling with',
    'having trouble',
    'issue with',
    'problem with',
    'pain point',
  ];

  // Negative signals that indicate promotional, spam, or negative content
  private readonly NEGATIVE_SIGNALS = [
    // Promotional phrases
    'i built',
    'i created',
    'i made',
    'i developed',
    'check out',
    'check this out',
    'try out',
    'try this',
    'sign up',
    'get started',
    'free trial',
    'special offer',
    'link in bio',
    '[promo]',
    '[promotional]',
    'promoting',
    'advertisement',
    'sponsored',
    'partnership',

    // Announcement/Launch phrases
    'just launched',
    'proud to announce',
    'excited to share',
    'happy to introduce',
    'introducing',
    'announcing',
    'released',
    'now available',
    'we launched',
    'we created',

    // Guide/Tutorial indicators
    'guide to',
    'walkthrough',
    'i wrote a guide',
    'i made a tutorial',
    'ultimate guide',
    "beginner's guide",
    'tips and tricks',
    '101',
    'explained',
    'deep dive',

    // Spam indicators
    'upvote',
    'vote for',
    'follow me',
    'subscribe',
    'join my',
    'join our',
    'discord server',
    'telegram group',
    'whatsapp group',

    // Self-promotion in title patterns
    'onboard test users',
    'thoughts on my',
    'thoughts on our',
  ];

  // Additional filters for specific patterns
  private readonly PROMOTIONAL_PATTERNS = [
    /i (built|created|made|developed|launched)/i,
    /check out (my|this|our)/i,
    /\[promo\]/i,
  ];

  // Common stop words to ignore when extracting terms
  private readonly STOP_WORDS = new Set([
    'a',
    'an',
    'am',
    'and',
    'are',
    'as',
    'at',
    'be',
    'by',
    'for',
    'from',
    'has',
    'he',
    'in',
    'is',
    'it',
    'its',
    'of',
    'on',
    'that',
    'the',
    'to',
    'was',
    'will',
    'with',
    'you',
    'your',
    'so',
    'can',
    'one',
    'all',
    'this',
    'helps',
  ]);

  constructor(productDescription: string) {
    this.config = {
      productDescription: productDescription,
      weights: {
        productDesc: 0.2, // Product relevance
        intent: 0.7, // Intent matters
        negative: 0.4, // Penalty for promotional/negative content
      },
      threshold: 0.41, // Minimum score to pass (adjust based on your needs)
      debug: true, // Set to true to see scoring details
    };
    this.productTerms = this.extractProductTerms(this.config.productDescription);
  }

  /**
   * Extract meaningful terms from product description
   * Converts the description into searchable terms/phrases
   */
  private extractProductTerms(description: string): string[] {
    const terms: string[] = [];
    const lowerDesc = description.toLowerCase();

    // Split by common delimiters
    const phrases = lowerDesc.split(/[,\.\-—]+/).map((s) => s.trim());

    phrases.forEach((phrase) => {
      // Add the entire phrase if it's meaningful (2-5 words)
      const words = phrase.split(/\s+/).filter((w) => w.length > 0);
      if (words.length >= 2 && words.length <= 5) {
        terms.push(phrase);
      }

      // Also add individual meaningful words (2+ chars, not stop words)
      words.forEach((word) => {
        const cleaned = word.replace(/[^a-z0-9]/g, '');
        if (cleaned.length >= 2 && !this.STOP_WORDS.has(cleaned)) {
          terms.push(cleaned);
        }
      });
    });

    // Remove duplicates
    return [...new Set(terms)];
  }

  /**
   * Main filter function that processes an array of Reddit posts
   */
  filterPosts(posts: RedditPostInsert[]): RedditPostInsert[] {
    const scoredPosts = posts.map((post) => this.scorePost(post));

    if (this.config.debug) {
      console.log('\n=== LOCAL INTENT FILTERING ===\n');
      console.log(
        `Product Terms Extracted: ${this.productTerms.slice(0, 10).join(', ')}${
          this.productTerms.length > 10 ? '...' : ''
        }`
      );
      console.log('');

      scoredPosts.forEach((scored) => {
        console.log(`URL: ${scored.post.url}`);
        console.log(
          `  Product: ${scored.productDescScore.toFixed(2)} | Intent: ${scored.intentScore.toFixed(
            2
          )} | Negative: ${scored.negativeScore.toFixed(2)}`
        );
        console.log(
          `  Final Score: ${scored.finalScore.toFixed(2)} | Passed: ${scored.passed ? '✅' : '❌'}`
        );
        console.log(`  Reasons: ${scored.reasons.join(', ')}`);
        console.log('---------------------------------');
      });
    }

    return scoredPosts.filter((scored) => scored.passed).map((scored) => scored.post);
  }

  /**
   * Score a single post using the weighted formula
   */
  private scorePost(post: RedditPostInsert): PostScore {
    const fullText = `${post.title} ${post.content}`.toLowerCase();
    const reasons: string[] = [];

    // Calculate product description match (0-1)
    const productDescScore = this.calculateProductMatch(fullText, reasons);

    // Calculate intent phrase presence (0-1)
    const intentScore = this.calculateIntentMatch(fullText, reasons);

    // Calculate negative signals (0-1)
    const negativeScore = this.calculateNegativeMatch(fullText, post, reasons);

    // Apply weighted formula: 0.8 × product + 0.4 × intent - 0.2 × negative
    const finalScore =
      this.config.weights.productDesc * productDescScore +
      this.config.weights.intent * intentScore -
      this.config.weights.negative * negativeScore;

    const passed = finalScore >= this.config.threshold;

    return {
      post,
      productDescScore,
      intentScore,
      negativeScore,
      finalScore,
      passed,
      reasons,
    };
  }

  /**
   * Calculate how well the post matches product description terms
   * Uses similarity scoring based on extracted terms from description
   */
  private calculateProductMatch(text: string, reasons: string[]): number {
    if (this.productTerms.length === 0) {
      reasons.push('No product terms to match');
      return 0;
    }

    let totalScore = 0;
    const matchedTerms: string[] = [];

    // Check each extracted term
    this.productTerms.forEach((term) => {
      if (text.includes(term)) {
        // Weight longer phrases more heavily
        const words = term.split(/\s+/).length;
        if (words >= 3) {
          totalScore += 0.3; // Multi-word phrases are highly relevant
        } else if (words === 2) {
          totalScore += 0.1; // Two-word phrases are moderately relevant
        } else {
          totalScore += 0.1; // Single words are less relevant
        }

        if (matchedTerms.length < 6) {
          // Only show first 5 for readability
          matchedTerms.push(term);
        }
      }
    });

    // Normalize score to 0-1 range
    // A good match should have 3-5 term matches
    const normalizedScore = Math.min(totalScore / 1.5, 1.0);

    if (matchedTerms.length > 0) {
      reasons.push(
        `Product match: ${matchedTerms.join(', ')}${this.productTerms.length > 10 ? '...' : ''}`
      );
    } else {
      reasons.push('No product terms matched');
    }

    return normalizedScore;
  }

  /**
   * Calculate intent signals (looking for, need, recommend, etc.)
   */
  private calculateIntentMatch(text: string, reasons: string[]): number {
    let intentScore = 0;
    const foundPhrases: string[] = [];

    this.INTENT_PHRASES.forEach((phrase) => {
      if (text.includes(phrase)) {
        // Weight certain phrases higher
        if (['looking for', 'need', 'recommend', 'searching for'].includes(phrase)) {
          intentScore += 0.8;
        } else if (['suggest', 'help me find', 'alternative to', 'best'].includes(phrase)) {
          intentScore += 0.7;
        } else {
          intentScore += 0.6;
        }
        foundPhrases.push(phrase);
      }
    });

    // Cap at 1.0
    const finalScore = Math.min(intentScore, 1.0);

    if (foundPhrases.length > 0) {
      reasons.push(
        `Intent phrases: ${foundPhrases.slice(0, 3).join(', ')}${
          foundPhrases.length > 3 ? '...' : ''
        }`
      );
    } else {
      reasons.push('No intent phrases found');
    }

    return finalScore;
  }

  /**
   * Calculate negative signals (promotional, spam, negative sentiment)
   */
  private calculateNegativeMatch(text: string, post: RedditPostInsert, reasons: string[]): number {
    let negativeScore = 0;
    const foundSignals: string[] = [];

    // Check for negative phrases
    this.NEGATIVE_SIGNALS.forEach((signal) => {
      if (text.includes(signal)) {
        // Weight promotional signals higher
        if (
          signal.includes('built') ||
          signal.includes('created') ||
          signal.includes('check out')
        ) {
          negativeScore += 0.4;
        } else if (signal.includes('guide') || signal.includes('tutorial')) {
          negativeScore += 0.2;
        } else {
          negativeScore += 0.2;
        }
        foundSignals.push(signal);
      }
    });

    // Check promotional patterns
    this.PROMOTIONAL_PATTERNS.forEach((pattern) => {
      if (pattern.test(text)) {
        negativeScore += 0.5;
        foundSignals.push('promotional pattern');
      }
    });

    // Author promoting in title
    if (post.title) {
      const lowerTitle = post.title.toLowerCase();
      if (lowerTitle.includes('i built')) {
        negativeScore += 0.6;
        foundSignals.push('self-promotion in title');
      }
    }

    // Very long selftext (often guides/tutorials)
    if (post.content && post.content.length > 2500) {
      negativeScore += 0.8;
      foundSignals.push('long post (guide?)');
    }

    // Contains bullet points or numbered lists (often guides)
    // if ((post.selftext.match(/\n\s*[\*\-]/g) || []).length > 5 ||
    //     (post.selftext.match(/\n\s*\d+\./g) || []).length > 5) {
    //   negativeScore += 0.3;
    //   foundSignals.push('structured list (guide?)');
    // }

    // URL in selftext (often promotional)
    const urlPattern = /(https?:\/\/[^\s]+)|\[.*\]\(.*\)/g;
    const urlMatches = post.content?.match(urlPattern) || [];
    if (urlMatches.length > 2) {
      negativeScore += 0.4;
      foundSignals.push('multiple URLs');
    }

    // Specific promotional subreddits
    // const promoSubreddits = [''];
    // if (post.subreddit && promoSubreddits.includes(post.subreddit.toLowerCase())) {
    //   negativeScore += 0.3;
    //   foundSignals.push('promotional subreddit');
    // }

    // Cap at 1.0
    const finalScore = Math.min(negativeScore, 1.0);

    if (foundSignals.length > 0) {
      reasons.push(
        `Negative signals: ${foundSignals.join(', ')}${foundSignals.length > 30 ? '...' : ''}`
      );
    }

    return finalScore;
  }
}

/**
 * Calculate similarity between two strings using Dice's Coefficient (bigram-based)
 * Returns a score between 0 and 1
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/\s+/g, '');
  const s2 = str2.toLowerCase().replace(/\s+/g, '');

  if (s1 === s2) return 1;
  if (s1.length < 2 || s2.length < 2) return 0;

  const bigrams1 = new Set();
  for (let i = 0; i < s1.length - 1; i++) {
    bigrams1.add(s1.substring(i, i + 2));
  }

  let intersect = 0;
  for (let i = 0; i < s2.length - 1; i++) {
    const bigram = s2.substring(i, i + 2);
    if (bigrams1.has(bigram)) {
      intersect++;
    }
  }

  return (2 * intersect) / (s1.length - 1 + s2.length - 1);
}

function filterDublicates(posts: RedditPostInsert[]) {
  const cleanedPosts: RedditPostInsert[] = [];
  console.log(`\n🔍 Checking for duplicates in ${posts.length} posts...`);

  for (const currentPost of posts) {
    let isDuplicate = false;

    for (const seenPost of cleanedPosts) {
      // 1. Check if same author
      if (currentPost.author?.trim() === seenPost.author?.trim()) {
        // 2. Exact Title Match
        if (currentPost.title?.trim() === seenPost.title?.trim()) {
          console.log(
            `❌ Duplicate found (100%): "${currentPost.url}"`
          );
          isDuplicate = true;
          break;
        }

        // 3. Similarity check (> 95%)
        const similarity = calculateSimilarity(currentPost.title || '', seenPost.title || '');
        if (similarity > 0.95) {
          // 4. Time proximity check (within 24 hours)
          const time1 = new Date(currentPost.created_at_reddit || 0).getTime();
          const time2 = new Date(seenPost.created_at_reddit || 0).getTime();
          const hoursDiff = Math.abs(time1 - time2) / (1000 * 60 * 60);

          if (hoursDiff < 24) {
            console.log(
              `❌ Duplicate found (${(similarity * 100).toFixed(1)}% similar, ${hoursDiff.toFixed(
                1
              )}h apart): "${currentPost.title}"`
            );
            isDuplicate = true;
            break;
          }
        }
      }
    }

    if (!isDuplicate) {
      console.log(
        `✅ Keeping unique post: "${
          currentPost.title ? currentPost.title.substring(0, 50) : 'No Title'
        }..." [r/${currentPost.subreddit}]`
      );
      cleanedPosts.push(currentPost);
    }
  }

  console.log(
    `📊 Duplicate filtering complete: ${posts.length - cleanedPosts.length} duplicates removed, ${
      cleanedPosts.length
    } posts remaining.\n`
  );
  return cleanedPosts;
}

export function filterOldPosts(posts: RedditPostInsert[]) {
  console.log(`\n📅 Checking for old posts in ${posts.length} posts...`);

  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

  const filteredPosts = posts.filter((post) => {
    if (!post.created_at_reddit) return false;

    const postDate = new Date(post.created_at_reddit);
    const isOld = postDate < fourMonthsAgo;

    if (isOld) {
      console.log(
        `❌ Removing old post: "${post.url}" (Created: ${postDate.toLocaleDateString()})`
      );
    }

    return !isOld;
  });

  console.log(
    `📊 Age filtering complete: ${posts.length - filteredPosts.length} old posts removed, ${
      filteredPosts.length
    } posts remaining.\n`
  );

  return filteredPosts;
}

function filterAnalyzedPosts(posts: RedditPostInsert[], analyzedIds: string[]) {
  const analyzedSet = new Set(analyzedIds);
  const remainingPosts = posts.filter((post) => {
    const isAnalyzed = analyzedSet.has(post.reddit_id!);
    
    if (isAnalyzed) {
      console.log(`⏩ Skipping already analyzed post for this campaign: ${post.url}`);
    }
    return !isAnalyzed;
  });

  if (posts.length !== remainingPosts.length) {
    console.log(
      `📊 Analysis filtering complete: ${
        posts.length - remainingPosts.length
      } already analyzed posts skipped, ${remainingPosts.length} posts remaining for AI analysis.\n`
    );
  }

  return remainingPosts;
}

export {
  RedditLeadFilter,
  filterDublicates,
  filterAnalyzedPosts,
  type FilterConfig,
  type RedditPost,
  type PostScore,
};
