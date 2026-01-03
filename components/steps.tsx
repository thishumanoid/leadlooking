'use client';

import { motion } from 'framer-motion';
import { FaReddit } from 'react-icons/fa';
import RedditIcon from './global/RedditIcon';
import { Bell, Check, Search, Plus, X, Mail, WandSparkles } from 'lucide-react';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Create a Campaign',
    description:
      "Describe what you're offering and select the keywords you want to monitor.",
    content: <Step1Content />,
  },
  {
    id: 2,
    title: 'We Scan Reddit 24/7',
    description:
      'Our system continuously scans Reddit for new posts matching your keywords, ensuring you never miss a lead.',
    content: <Step2Content />,
  },
  {
    id: 3,
    title: 'Get Instant Alerts',
    description:
      'Receive real-time notifications via email whenever a high-intent lead is found, ready for your outreach.',
    content: <Step3Content />,
  },
];

export default function Steps() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // Should only animate once
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium border rounded-full border-primary/20 bg-primary/10 text-primary">
              How It Works
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Find Your Next Customers in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                3 Simple Steps
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="relative flex flex-col items-center w-full gap-24 md:gap-32">
          {/* Vertical Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative z-10 w-full"
            >
              <div
                className={`flex flex-col items-center gap-12 md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 text-xl font-bold border-2 rounded-full border-primary text-primary bg-background shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                      {step.id}
                    </div>
                    <h3 className="text-3xl font-bold">{step.title}</h3>
                    <p className="max-w-md text-lg text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Visual Content */}
                <div className="flex items-center justify-center flex-1 w-full p-4">
                  <div className="relative w-full max-w-[500px] aspect-square md:aspect-[4/3] rounded-2xl border border-secondary bg-background/50 backdrop-blur-sm p-4 md:p-8 shadow-2xl overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl bg-primary -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 blur-3xl bg-orange-500 -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />

                    <div className="relative flex items-center justify-center w-full h-full">
                      {step.content}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

// --- Step 1 Content: Create Campaign Mock ---
function Step1Content() {
  return (
    <div className="flex flex-col w-full h-full gap-4 font-sans select-none">
      <div className="flex items-center justify-between p-3 border rounded-lg bg-card/80 backdrop-blur-sm border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Plus className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">New Campaign</span>
        </div>
      </div>

      <div className="relative flex flex-col flex-1 gap-3 p-4 overflow-hidden border shadow-inner rounded-xl bg-card/40 backdrop-blur-md border-border/50">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 rounded-full w-32 h-32 bg-primary/5 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

        <div className="z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              Keywords
              <span className="w-1 h-1 rounded-full bg-primary" />
            </div>

            <WandSparkles className="w-4 h-4" />
          </div>

          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Each keyword is searched individually. Keep them short and meaningful.
          </p>

          <div className="space-y-2">
            {['need CRM software', 'looking for CRM', 'HubSpot alternative'].map((val, i) => (
              <div key={i} className="relative flex items-center gap-2 group">
                <div className="relative flex-1">
                  <input
                    type="text"
                    defaultValue={val}
                    placeholder="Enter keyword..."
                    className="w-full h-8 px-3 text-xs transition-all border rounded-lg bg-background/60 border-border/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
                    readOnly
                  />
                  {val && (
                    <div className="absolute -translate-y-1/2 cursor-pointer right-2 top-1/2 text-muted-foreground/50 hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Step 2 Content: Scanning Animation ---
function Step2Content() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Radar Rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute border rounded-full border-primary/20"
          style={{
            width: `${i * 30}%`,
            height: `${i * 30}%`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scanning Line */}
      <motion.div
        className="absolute w-[45%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ top: '50%', left: '50%', transformOrigin: '0 0' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central Icon */}
      <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-background rounded-full border-2 border-primary shadow-lg shadow-primary/30">
        <RedditIcon size={60} />
      </div>

      {/* Floating Elements (Posts) */}
      <motion.div
        className="absolute top-[20%] right-[20%] p-2 bg-card rounded-lg border border-border shadow-sm text-[10px] w-24"
        animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      >
        <div className="w-full h-2 mb-1 rounded bg-secondary" />
        <div className="w-2/3 h-2 rounded bg-secondary" />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[20%] p-2 bg-card rounded-lg border border-border shadow-sm text-[10px] w-24"
        animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <div className="w-full h-2 mb-1 rounded bg-secondary" />
        <div className="w-2/3 h-2 rounded bg-secondary" />
      </motion.div>
    </div>
  );
}

// --- Step 3 Content: Notification Mock ---
function Step3Content() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-xs">
        {/* Background Cards (Stacked) */}
        <div className="absolute top-4 left-4 right-4 h-24 bg-card/40 border border-border rounded-xl scale-95 -z-10" />
        <div className="absolute top-2 left-2 right-2 h-24 bg-card/70 border border-border rounded-xl scale-95 -z-10" />

        {/* Main Notification Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 border shadow-xl bg-card rounded-xl border-border"
        >
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold">New Lead Found!</h4>
                <span className="block w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                u/marketing_guru is looking for "CRM Software recommendations" in r/marketing.
              </p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 px-3 py-1.5 text-xs font-medium text-center text-primary-foreground bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-colors">
                  Reply Now
                </button>
                <button className="flex items-center justify-center w-8 h-8 border rounded-md border-border hover:bg-secondary transition-colors">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          className="absolute -top-3 -right-3 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white shadow-lg border-2 border-background"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <Check className="w-4 h-4 stroke-[3px]" />
        </motion.div>
      </div>
    </div>
  );
}
