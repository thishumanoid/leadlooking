import GetStartedBtn from './ui/CheckoutBtn';
import Image from 'next/image';

const Hero2 = () => (
  <div className="w-full pt-12 -mt-8 lg:pt-24 pb-20 lg:pb-40">
    <div className="container mx-auto">
      <div
        className="grid grid-cols-1 gap-8 items-ce
      nter lg:grid-cols-2"
      >
        <div className="flex gap-4 mt-14 flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-6xl max-w-lg text-left font-bold text-foreground">
              Lorem ipsum dolor sit amet, <span className="italic">adiping elit</span>
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-md text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
          <GetStartedBtn className="w-60" />
        </div>
        <div className="relative -mt-3 w-full aspect-square overflow-hidden">
          <Image
            src="/images/hero-image.jpg"
            alt="extFast screenshot preview"
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
      </div>
    </div>
  </div>
);

export default Hero2;
