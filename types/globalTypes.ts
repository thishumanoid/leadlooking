// export interface RedditPost {
//   reddit_id: string;
//   subreddit: string;
//   author: string;
//   title: string;
//   content: string;
//   url: string;
//   created_at_reddit: Date;
//   score: number;
// }


// export interface Campaign {
//   id: string;
//   user_id: string;
//   name: string | null;
//   description: string | null;
//   website_url: string | null;
//   config: {
//     ai_tone: string;
//     message_length: string;
    
//   }

// }

// export interface Keyword {
//   id: string;
//   keyword: string;
// }


export type postLabels = {
    intent: "seeking" | "promoting" | "discussing" | "unclear";
    leadScore: number;
}