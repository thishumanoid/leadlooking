import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BtnProps {
  className?: string;
  onClick?: () => void;
}

export default function GetStartedBtn({ className, onClick }: BtnProps) {
  return (
    <div className={`flex flex-row gap-4 ${className || ''}`}>
      <Button onClick={onClick} size="lg" className="w-full gap-4">
        Find My Lead
        <Zap size={20} fill="white" className="-ml-2" />
      </Button>
    </div>
  );
}
