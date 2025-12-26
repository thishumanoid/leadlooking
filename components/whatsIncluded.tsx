import React from 'react';
import { 
  Check, 
  Puzzle, 
  Layout, 
  Server, 
  Palette, 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// MOCK DATA
const features = [
  {
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: <Puzzle className="w-6 h-6 text-primary" />,
    badge: "Lorem + Ipsum",
    items: [
      "Lorem ipsum dolor sit amet, consectetur.",
      "Ut enim ad minim veniam, quis nostrud.",
      "Duis aute irure dolor in reprehenderit.",
      "Excepteur sint occaecat cupidatat non proident.",
      "Sunt in culpa qui officia deserunt mollit anim id est laborum."
    ]
  },
  {
    title: "Sed do eiusmod tempor",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    icon: <Layout className="w-6 h-6 text-primary" />,
    badge: "Tempor + Labore",
    items: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Quis autem vel eum iure reprehenderit qui in ea.",
      "At vero eos et accusamus et iusto odio dignissimos.",
      "Et harum quidem rerum facilis est et expedita distinctio.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque."
    ]
  },
  {
    title: "Consectetur adipiscing elit",
    description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    icon: <Server className="w-6 h-6 text-primary" />,
    badge: "Consectetur + Elit",
    items: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      "Quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      "Ut aliquid ex ea commodi consequatur?"
    ]
  },
  {
    title: "Ut enim ad minim veniam",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    icon: <Palette className="w-6 h-6 text-primary" />,
    badge: "Figma + Ipsum",
    items: [
      "Laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      "Cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      "Officia deserunt mollit anim id est laborum."
    ]
  }
];

export default function WhatsIncluded() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        
        {/* Section Header (replaced with lorem ipsum) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">
            Lorem ipsum dolor sit amet?
          </h2>
          <p className="text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card/50 hover:bg-card/80 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
