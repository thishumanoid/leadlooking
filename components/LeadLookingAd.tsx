import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function LeadLookingAd() {
  return (
    <Card className="my-8 border-2 border-blue-500/20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Sponsored
          </span>
        </div>
        <CardTitle className="text-2xl">
          🎯 Find High-Intent Leads on Reddit Automatically
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Stop wasting hours searching Reddit manually. LeadLooking finds your ideal clients while
          you focus on closing deals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span className="text-sm">Automated lead discovery across all subreddits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span className="text-sm">Real-time notifications for high-intent prospects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
            <span className="text-sm">Save 10+ hours per week on lead generation</span>
          </li>
        </ul>
        <div className="flex gap-3">
          <a href="https://yoursite.com/signup" target="_blank" rel="noopener noreferrer">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
          <a href="https://yoursite.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Learn More</Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
