
/// NOTE: this component does not have checkout functionality, use pricingCards.tsx file instead


import { Check, MoveRight, PhoneCall } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PricingCards2 = () => (
  <div className="container mx-auto pt-20">
    <div className="flex text-center justify-center items-center gap-4 flex-col">
      <div className="inline-block">
      </div>
      <div className="flex gap-6 flex-col">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          Prices that make sense!
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl text-center mx-auto">
          Managing a small business today is already tough.
        </p>
      </div>
      <div className="grid pt-5 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
        <Card className="w-full rounded-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              <span className="flex flex-row gap-4 items-center">Startup</span>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever for
              everyone and everywhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-8 justify-start">
              <p className="flex flex-row items-center gap-2 text-base">
                <span className="text-5xl font-bold">$40</span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="gap-4">
                Sign up today <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full shadow-2xl rounded-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              <span className="flex flex-row gap-4 items-center">Growth</span>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever for
              everyone and everywhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-8 justify-start">
              <p className="flex flex-row items-center gap-2 text-base">
                <span className="text-5xl font-bold">$40</span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="gap-4">
                Sign up today <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full rounded-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              <span className="flex flex-row gap-4 items-center">Enterprise</span>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever for
              everyone and everywhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-8 justify-start">
              <p className="flex flex-row items-center gap-2 text-base">
                <span className="text-5xl font-bold">$40</span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Fast and reliable</p>
                    <p className="text-muted-foreground text-sm">
                      We&apos;ve made it fast and reliable.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="gap-4">
                Book a meeting <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default PricingCards2;
