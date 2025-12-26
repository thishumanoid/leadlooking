import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BtnProps {
  className?: string;
  onClick?: () => void;
}

export default function GetStartedBtn( { className, onClick }: BtnProps) {
  return (
    <div className="flex flex-row gap-4">
      <Button onClick={onClick} size="lg" className={`gap-4 ${className || ''}`}>
        <Zap fill='white' className='-mr-2' />Get Started
      </Button>
    </div>
  );
}