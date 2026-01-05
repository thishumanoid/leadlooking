import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Zap, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScanResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  strongMatches: number;
  potentialMatches: number;
}

export function ScanResultsDialog({
  open,
  onOpenChange,
  strongMatches,
  potentialMatches,
}: ScanResultsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 bg-transparent shadow-none p-0 overflow-visible">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card border rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center space-y-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Scan Complete!</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              We found some leads for your product/service.
            </p>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/60 transition-colors">
              <div className="p-3 bg-yellow-500/10 rounded-full mb-3">
                <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <span className="text-3xl font-bold text-foreground">{strongMatches}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                Strong Matches
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/60 transition-colors">
              <div className="p-3 bg-blue-500/10 rounded-full mb-3">
                <Coffee className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-3xl font-bold text-foreground">{potentialMatches}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                Potential Matches
              </span>
            </div>
          </div>

          <div className="p-6 pt-0">
            <Button
              className="w-full h-12 text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              View Leads
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
