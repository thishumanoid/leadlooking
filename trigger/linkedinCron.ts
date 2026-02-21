import 'dotenv/config';
import { logger, schedules } from "@trigger.dev/sdk/v3";
import linkedinBot from '@/scripts/linkedin-bot';



export const linkedinAutoPostTask = schedules.task({
  id: "linkedin-auto-poster",
  // Run every weekday at 9 AM UTC
  cron: "0 9 * * 1-5", 
  maxDuration: 300, // 5 mins
  run: async (payload, { ctx }) => {
    logger.info("🤖 Starting LinkedIn Auto-Post sequence...");
    const result = await linkedinBot();
    logger.info("LinkedIn Auto-Post sequence completed", { result });
    
  },
});