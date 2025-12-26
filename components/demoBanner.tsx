import Link from "next/link";
import { ArrowRight } from "lucide-react"; 

export function DemoBanner() {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-neutral-900 px-6 py-1 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-transparent opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
      </div>
      
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-primary-foreground">
          This is a demo preview of the boilerplate
        </p>
        <Link
          href="https://extfast.web.app/"
          target="_blank"
          className="flex-none rounded-md px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
        >
          Visit extFast to purchase <ArrowRight className="inline-block ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
      </div>
    </div>
  );
}