'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const faqs = [
  {
    question: 'Which social media channels can I monitor with your tool?',
    answer:
      "Currently, our tool focuses exclusively on Reddit. We're actively considering additional platforms based on what our users request most.",
  },
  {
    question: 'How does the keyword scanning process work?',
    answer:
      'Our system analyzes thousands of Reddit posts everyday. We use AI to filter posts and surface only the conversations that align with your product and specified keywords - ensuring you see prospects who are actively seeking solutions like yours.',
  },
  {
    question: 'Can I have a custom plan tailored to my needs?',
    answer: `Yes! If our existing pricing tiers don't match your use case, we're open to creating a customized package. 
    Just contact us at neuhiman@gmail.com to discuss options.`,
  },
  {
    question: 'Is there any risk of my Reddit account getting suspended?',
    answer:
      "Not at all - our tool doesn't require you to link or authenticate your Reddit account. We retrieve all data through Reddit's official public API, which keeps your account completely safe and separate from the scanning process.",
  },
 
];

const FAQ = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-2 flex-col">
              <h2 className="text-4xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Have another question? Send me an{' '}
                <Link className="underline" href={'/feedback'}>
                  email
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={'index-' + index}>
              <AccordionTrigger className="text-lg  no-underline hover:no-underline data-[state=open]:font-extrabold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);

export default FAQ;
