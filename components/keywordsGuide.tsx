import { CircleQuestionMark } from "lucide-react";

const KeywordsGuide = () => {
  const operators = [
    {
      label: '" "',
      example: '"waitlist builder"',
      description: 'Finds exact phrase matches in posts',
      color: 'green',
    },
    {
      label: 'AND',
      example: '"waitlist builder" AND "validate idea"',
      description: 'Both terms must appear in posts',
      color: 'blue',
    },
    {
      label: 'OR',
      example: '"no-code waitlist" OR "waitlist"',
      description: 'Either term can appear in posts',
      color: 'purple',
    },    
    {
      label: '( )',
      example: '("looking for" OR "need") AND "waitlist"',
      description: 'Groups multiple terms',
      color: 'orange',
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'purple':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'green':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'orange':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="rounded-2xl border border-foreground/10 p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-foreground/10 text-foreground">
          <CircleQuestionMark className="w-4 h-4 text-foreground" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">Guide for writing better keywords</h4>
          <p className="text-xs mt-1 text-muted-foreground">
            Use search operators to find high-quality leads, for example:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {operators.map((op) => (
          <div
            key={op.label}
            className="group flex flex-col p-3.5 rounded-xl border border-muted-foreground/10 bg-background/40 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full border tracking-wider ${getColorClass(
                  op.color
                )}`}
              >
                {op.label}
              </span>
              <span className="text-xs font-semibold text-foreground/90">{op.description}</span>
            </div>
            <div className="relative">
              <code className="block text-sm sm:text-sm font-mono bg-background/60 p-2.5 rounded-lg border border-primary/5 text-foreground/90 transition-colors break-all sm:break-normal">
                {op.example}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsGuide;