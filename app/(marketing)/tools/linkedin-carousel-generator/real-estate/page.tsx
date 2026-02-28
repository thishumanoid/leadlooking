import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Zap, Lock, Gift, Smartphone } from "lucide-react";
import LinkedInCarouselGenerator from "@/components/tools/carousel-generator";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "LinkedIn Carousel Generator for Real Estate",
  description:
    "Free LinkedIn carousel generator for real estate agents. Create stunning property listing carousels, market tips & lead gen slides in minutes. No design skills needed.",
  keywords: [
    "linkedin carousel generator",
    "linkedin carousel generator for real estate agents",
    "real estate linkedin carousel",
    "linkedin carousel maker",
    "real estate social media tools",
  ],
  alternates: {
    canonical: "https://leadlooking.com/tools/linkedin-carousel-generator",
  },
  openGraph: {
    title: "LinkedIn Carousel Generator for Real Estate Agents — Free Tool",
    description:
      "Build beautiful LinkedIn carousels for real estate in minutes. Fully editable slides, instant PDF download, 100% free.",
    url: "https://yourdomain.com/tools/linkedin-carousel-generator",
    siteName: "YourBrand",
    images: [
      {
        url: "https://yourdomain.com/og/linkedin-carousel-generator.png",
        width: 1200,
        height: 630,
        alt: "LinkedIn Carousel Generator for Real Estate Agents",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LinkedIn Carousel Generator for Real Estate Agents",
    description:
      "Create scroll-stopping LinkedIn carousels for real estate in minutes. Editable slides, instant PDF export, 100% free.",
    images: ["https://yourdomain.com/og/linkedin-carousel-generator.png"],
  },
};

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "LinkedIn Carousel Generator for Real Estate Agents",
      applicationCategory: "DesignApplication",
      operatingSystem: "Web Browser",
      url: "https://yourdomain.com/tools/linkedin-carousel-generator",
      description:
        "A free, browser-based LinkedIn carousel generator designed specifically for real estate agents. Create, edit, and download professional carousel posts as PDFs.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Fully editable slide templates",
        "Add or remove slides",
        "Reorder slides with one click",
        "Remove individual text elements",
        "Download as PDF",
        "No account required",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this LinkedIn carousel generator really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely free. No account, no watermarks, no hidden fees. Build and download as many carousels as you like.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this tool to generate carousels for real estate listings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. The templates are pre-built for real estate content — from property tips to market updates and lead-generation slides.",
          },
        },
        {
          "@type": "Question",
          name: "How do I post the carousel on LinkedIn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Download the PDF using the 'Download PDF' button, then upload it directly as a document post on LinkedIn. LinkedIn renders PDF pages as swipeable carousel slides.",
          },
        },
        {
          "@type": "Question",
          name: "Does my data leave the browser?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All editing and PDF generation happens entirely in your browser. Nothing is sent to any server.",
          },
        },
      ],
    },
  ],
};

// ─── Lazy-load heavy client component ────────────────────────────────────────

// const LinkedInCarouselGenerator = dynamic(
//   () => import("../../components/carousel-generator.tsx"),
//   { ssr: false, loading: () => <CarouselSkeleton /> }
// );

function CarouselSkeleton() {
  return (
    <div className="flex gap-5 overflow-hidden pb-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[340px] h-[420px] rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LinkedInCarouselPage() {
  const faqs = [
    {
      q: "Is this LinkedIn carousel generator really free?",
      a: "Yes, completely free. No account, no watermarks, no hidden fees. Build and download as many carousels as you like.",
    },
    {
      q: "Can I use this tool to generate carousels for real estate listings?",
      a: "Absolutely. The templates are pre-built for real estate content — from property tips to market updates and lead-generation slides.",
    },
    {
      q: "How do I post the carousel on LinkedIn?",
      a: "Download the PDF using the 'Download PDF' button, then upload it directly as a document post on LinkedIn. LinkedIn renders PDF pages as swipeable carousel slides.",
    },
    {
      q: "Does my data leave the browser?",
      a: "No. All editing and PDF generation happens entirely in your browser. Nothing is sent to any server.",
    },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-20">
        {/* ── Hero ── */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="secondary" className="text-xs font-semibold tracking-wide uppercase">
            Free Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            LinkedIn Carousel Generator{" "}
            <span className="text-primary">for Real Estate Agents</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Create scroll-stopping LinkedIn carousels that showcase listings,
            market expertise, and generate leads, without any design skills.
            Edit, customise, and download as a PDF in minutes.
          </p>
        </section>

        {/* ── Tool ── */}
        <section aria-label="LinkedIn Carousel Editor">
          <LinkedInCarouselGenerator />
        </section>

        {/* ── How to Use ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Use the LinkedIn Carousel Generator
          </h2>
          <ol className="space-y-4 list-none">
            {[
              {
                step: 1,
                title: "Edit the pre-built real estate slides",
                desc: "Click on any text in a slide to edit it inline. Change headlines, body copy, badge labels, or author lines to match your brand and content.",
              },
              {
                step: 2,
                title: "Add, remove, or reorder slides",
                desc: "Use the ← → arrows to reorder slides, the trash icon to delete a slide, or the 'Add Slide' card to insert a new one.",
              },
              {
                step: 3,
                title: "Remove individual text elements",
                desc: "Hover over any text block and click the red ✕ button to delete that element from the slide — giving you full layout control.",
              },
              {
                step: 4,
                title: "Download as PDF and post on LinkedIn",
                desc: "Hit 'Download PDF' to get your carousel file. Upload it as a Document Post on LinkedIn — it will automatically render as a swipeable carousel.",
              },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step}
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Benefits ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Why Real Estate Agents Love This Tool
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <Zap className="h-5 w-5 text-yellow-500" />,
                title: "Instant & Fast",
                desc: "Go from blank canvas to download-ready carousel in under 5 minutes. No exporting from Canva or Figma required.",
              },
              {
                icon: <Lock className="h-5 w-5 text-blue-500" />,
                title: "Private & Secure",
                desc: "Everything runs locally in your browser. Your listing data and client info never leaves your device.",
              },
              {
                icon: <Gift className="h-5 w-5 text-green-500" />,
                title: "100% Free, No Watermarks",
                desc: "No subscriptions, no credit card, no watermarks on exported PDFs. Completely free for real estate professionals.",
              },
              {
                icon: <Smartphone className="h-5 w-5 text-purple-500" />,
                title: "LinkedIn-Native Format",
                desc: "PDFs posted as LinkedIn document posts render natively as carousels — maximising reach and dwell time on your content.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="mt-0.5">{icon}</div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What is section ── */}
        <section className="space-y-4 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">
            What Is a LinkedIn Carousel for Real Estate?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A LinkedIn carousel is a multi-page PDF document uploaded as a post.
            Viewers swipe through the pages — making it one of the highest
            engagement formats on the platform. For real estate agents,
            carousels are the perfect vehicle to share property tours,
            neighbourhood guides, market statistics, buyer/seller tips, and
            personal branding content in a format that drives saves, shares, and
            inbound leads.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Unlike static image posts, carousels reward curiosity — each swipe
            reveals more value, increasing the time LinkedIn's algorithm marks
            your post as engaging. Agents who post 2-4 carousels per month
            consistently report higher profile views, connection requests, and
            consultation bookings than those using only text or single-image
            posts. A dedicated LinkedIn carousel generator built for real estate
            makes it effortless to produce this content at scale.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-6 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border rounded-xl px-4"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── CTA ── */}
        <section className="text-center space-y-4 py-12 px-6 rounded-2xl bg-muted/40 border">
          <h2 className="text-2xl font-bold">
            Want to Automate Your LinkedIn Content?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            This free tool is a taste of what's possible. Our full platform lets
            real estate teams schedule carousels, repurpose listings
            automatically, and grow their LinkedIn presence on autopilot.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Explore the Full Platform →
          </a>
        </section>
      </main>
    </>
  );
}