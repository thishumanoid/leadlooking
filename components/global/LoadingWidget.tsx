import Logo from '@/components/global/YourLogo';

export default function LoadingWidget() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl animate-pulse" />

        {/* Pulsing logo container */}
        <div className="relative transform hover:scale-110 transition-transform duration-300">
          <Logo width="80" height="80" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase animate-pulse">
          Initializing
        </p>
        <div className="flex items-center space-x-1.5">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-duration:1s] [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-duration:1s] [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-duration:1s]" />
        </div>
      </div>
    </div>
  );
}
