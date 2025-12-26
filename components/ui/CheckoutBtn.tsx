import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckoutBtnProps {
  className?: string;
}

export default function CheckoutBtn( { className }: CheckoutBtnProps) {
  return (
    <div className="flex flex-row gap-4">
      <Button size="lg" className={`gap-4 ${className || ''}`}>
        <Zap fill='white' className='-mr-2' />Upgrade Now
      </Button>
    </div>
  );
}
