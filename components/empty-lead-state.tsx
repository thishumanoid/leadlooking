import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Edit3, ArrowRight, Search } from 'lucide-react';

export function EmptyLeadState() {
  return (
    <Card className="border-dashed bg-card/50">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-lg mx-auto">
        <div className="bg-primary/10 p-4 rounded-full mb-6 relative">
          <Search className="w-10 h-10 text-primary animate-pulse" />
          {/* <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border shadow-sm">
            <span className="text-xl">🤔</span>
          </div> */}
        </div>

        <h3 className="text-xl font-semibold mb-2">No leads found yet</h3>
        <p className="text-muted-foreground mb-8">
          We haven't found any Reddit posts matching your criteria just yet, although this is
          normal, but you can try:
        </p>

        <div className="grid gap-4 w-full text-left">
          <div className="flex gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors">
            <div className="bg-blue-500/10 p-2.5 rounded-md h-fit">
              <Edit3 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Check your keywords</h4>
              <p className="text-sm text-muted-foreground">
                Your keywords might be too specific or irrelevant. Try using terms that appear in
                Reddit post titles and bodies.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors">
            <div className="bg-orange-500/10 p-2.5 rounded-md h-fit">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Wait for the next scan</h4>
              <p className="text-sm text-muted-foreground">
                Maybe nobody posted about your topic recently. Be patient! Our system checks for new
                posts periodically.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
