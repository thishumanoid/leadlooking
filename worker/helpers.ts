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
  post: RedditPost;
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
    'what\'s the best',
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
    'beginner\'s guide',
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
    /check out (my|this)/i,
    /\[promo\]/i,
  ];
  
  // Common stop words to ignore when extracting terms
  private readonly STOP_WORDS = new Set([
    'a', 'an','am', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'you', 'your', 'so', 'can', 'one',
    'all', 'this', 'helps', 'place', 'build', 'grow'
  ]);
  
  constructor(config: FilterConfig) {
    this.config = config;
    this.productTerms = this.extractProductTerms(config.productDescription);
  }
  
  /**
   * Extract meaningful terms from product description
   * Converts the description into searchable terms/phrases
   */
  private extractProductTerms(description: string): string[] {
    const terms: string[] = [];
    const lowerDesc = description.toLowerCase();
    
    // Split by common delimiters
    const phrases = lowerDesc.split(/[,\.\-—]+/).map(s => s.trim());
    
    phrases.forEach(phrase => {
      // Add the entire phrase if it's meaningful (2-5 words)
      const words = phrase.split(/\s+/).filter(w => w.length > 0);
      if (words.length >= 2 && words.length <= 5) {
        terms.push(phrase);
      }
      
      // Also add individual meaningful words (2+ chars, not stop words)
      words.forEach(word => {
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
  filterPosts(posts: RedditPost[]): RedditPost[] {
    const scoredPosts = posts.map(post => this.scorePost(post));
    
    if (this.config.debug) {
      console.log('\n=== FILTERING RESULTS ===\n');
      console.log(`Product Terms Extracted: ${this.productTerms.slice(0, 10).join(', ')}${this.productTerms.length > 10 ? '...' : ''}`);
      console.log('');
      
      scoredPosts.forEach(scored => {
        console.log(`Post: ${scored.post.title}`);
        console.log(`Post: ${scored.post.permalink}`);
        console.log(`  Product: ${scored.productDescScore.toFixed(2)} | Intent: ${scored.intentScore.toFixed(2)} | Negative: ${scored.negativeScore.toFixed(2)}`);
        console.log(`  Final Score: ${scored.finalScore.toFixed(2)} | Passed: ${scored.passed ? '✅' : '❌'}`);
        console.log(`  Reasons: ${scored.reasons.join(', ')}`);
        console.log('');
      });
    }
    
    return scoredPosts
      .filter(scored => scored.passed)
      .map(scored => scored.post);
  }
  
  /**
   * Score a single post using the weighted formula
   */
  private scorePost(post: RedditPost): PostScore {
    const fullText = `${post.title} ${post.selftext}`.toLowerCase();
    const reasons: string[] = [];
    
    // Calculate product description match (0-1)
    const productDescScore = this.calculateProductMatch(fullText, reasons);
    
    // Calculate intent phrase presence (0-1)
    const intentScore = this.calculateIntentMatch(fullText, reasons);
    
    // Calculate negative signals (0-1)
    const negativeScore = this.calculateNegativeMatch(fullText, post, reasons);
    
    // Apply weighted formula: 0.8 × product + 0.4 × intent - 0.2 × negative
    const finalScore = 
      (this.config.weights.productDesc * productDescScore) +
      (this.config.weights.intent * intentScore) -
      (this.config.weights.negative * negativeScore);
    
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
    this.productTerms.forEach(term => {
      if (text.includes(term)) {
        // Weight longer phrases more heavily
        const words = term.split(/\s+/).length;
        if (words >= 3) {
          totalScore += 0.5; // Multi-word phrases are highly relevant
        } else if (words === 2) {
          totalScore += 0.3; // Two-word phrases are moderately relevant
        } else {
          totalScore += 0.15; // Single words are less relevant
        }
        
        if (matchedTerms.length < 5) { // Only show first 5 for readability
          matchedTerms.push(term);
        }
      }
    });
    
    // Normalize score to 0-1 range
    // A good match should have 3-5 term matches
    const normalizedScore = Math.min(totalScore / 1.5, 1.0);
    
    if (matchedTerms.length > 0) {
      reasons.push(`Product match: ${matchedTerms.join(', ')}${this.productTerms.length > 10 ? '...' : ''}`);
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
    
    this.INTENT_PHRASES.forEach(phrase => {
      if (text.includes(phrase)) {
        // Weight certain phrases higher
        if (['looking for', 'need', 'recommend', 'searching for'].includes(phrase)) {
          intentScore += 0.6;
        } else if (['suggest', 'help me find', 'alternative to', 'best'].includes(phrase)) {
          intentScore += 0.5;
        } else {
          intentScore += 0.4;
        }
        foundPhrases.push(phrase);
      }
    });
    
    // Cap at 1.0
    const finalScore = Math.min(intentScore, 1.0);
    
    if (foundPhrases.length > 0) {
      reasons.push(`Intent phrases: ${foundPhrases.slice(0, 3).join(', ')}${foundPhrases.length > 3 ? '...' : ''}`);
    } else {
      reasons.push('No intent phrases found');
    }
    
    return finalScore;
  }
  
  /**
   * Calculate negative signals (promotional, spam, negative sentiment)
   */
  private calculateNegativeMatch(text: string, post: RedditPost, reasons: string[]): number {
    let negativeScore = 0;
    const foundSignals: string[] = [];
    
    // Check for negative phrases
    this.NEGATIVE_SIGNALS.forEach(signal => {
      if (text.includes(signal)) {
        // Weight promotional signals higher
        if (signal.includes('built') || signal.includes('created') || signal.includes('check out')) {
          negativeScore += 0.4;
        } else if (signal.includes('guide') || signal.includes('tutorial') || signal.includes('how to')) {
          negativeScore += 0.2;
        } else {
          negativeScore += 0.2;
        }
        foundSignals.push(signal);
      }
    });
    
    // Check promotional patterns
    this.PROMOTIONAL_PATTERNS.forEach(pattern => {
      if (pattern.test(text)) {
        negativeScore += 0.5;
        foundSignals.push('promotional pattern');
      }
    });
    
    // Additional heuristics
    
    // Author promoting in title
    if (post.title.toLowerCase().includes('i built') || 
        post.title.toLowerCase().includes('my tool') ||
        post.title.toLowerCase().includes('my app')) {
      negativeScore += 0.7;
      foundSignals.push('self-promotion in title');
    }
    
    // Very long selftext (often guides/tutorials)
    if (post.selftext.length > 2000) {
      negativeScore += 0.2;
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
    const urlMatches = post.selftext.match(urlPattern) || [];
    if (urlMatches.length > 2) {
      negativeScore += 0.4;
      foundSignals.push('multiple URLs');
    }
    
    // Specific promotional subreddits
    const promoSubreddits = [''];
    if (promoSubreddits.includes(post.subreddit.toLowerCase())) {
      negativeScore += 0.3;
      foundSignals.push('promotional subreddit');
    }
    
    // Cap at 1.0
    const finalScore = Math.min(negativeScore, 1.0);
    
    if (foundSignals.length > 0) {
      reasons.push(`Negative signals: ${foundSignals.slice(0, 3).join(', ')}${foundSignals.length > 3 ? '...' : ''}`);
    }
    
    return finalScore;
  }
}





export { RedditLeadFilter, type FilterConfig, type RedditPost, type PostScore };