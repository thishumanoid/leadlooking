# LeadLooking 🔍

> An autonomous AI agent that monitors Reddit 24/7 and surfaces warm leads for your product — on autopilot.

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Trigger.dev](https://img.shields.io/badge/Trigger.dev-e879f9?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)

**[Live Demo](https://leadlooking.com)** · **[Report a Bug](https://github.com/thishumanoid/leadlooking/issues)** · **[Request a Feature](https://github.com/thishumanoid/leadlooking/issues)**

---

## The Problem

Reddit is one of the highest-intent platforms on the internet. Every day, thousands of people post things like:

> *"Is there any tool that helps me automate X?"*
> 
> *"Looking for a SaaS that does Y — any recommendations?"*
> 
> *"We're struggling with Z at work. What does everyone use?"*

These are warm, inbound leads, people who already have the problem you solve, actively looking for a solution. But finding them manually across hundreds of subreddits, in real time, is impossible at scale.

**LeadLooking solves this.**

---

## How It Works

```
Enter product details  →  Agent monitors Reddit  →  AI scores each post  →  Leads land in your dashboard
```

1. **Describe your product** — Name, description, and the core problem it solves
2. **Agent spins up** — A persistent background agent begins scanning relevant subreddits
3. **AI analysis** — Every post and thread is run through an LLM, scored for intent, pain, and product fit
4. **Leads surfaced** — High-scoring matches appear in your dashboard with context, score, and a direct link
5. **Runs forever** — The agent loops on a schedule with zero manual effort

---

## Features

- **Autonomous Agent** — Persistent agent via Trigger.dev. Runs on a cron, survives failures, retries automatically
- **LLM Intent Scoring** — Posts are semantically analysed for buying intent, not just keyword matched
- **Smart Subreddit Targeting** — Relevant subreddits are identified automatically from your product description
- **Lead Dashboard** — Clean, filterable UI with post scores, subreddit, engagement metrics, and direct links
- **Rate-limit Aware Scraping** — Built to respect Reddit's API constraints and stay under the radar
- **Multi-product Support** — Run independent agents for multiple products simultaneously
- **Fully Open Source** — Self-hostable, transparent, and hackable

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, shadcn/ui, Tailwind CSS |
| API & Auth | Vercel Serverless Functions |
| Agent & Scraping | Trigger.dev (scheduled + durable background jobs) |
| AI Scoring | LLM pipeline (OpenAI / Anthropic) |
| Deployment | Vercel (frontend + API), Trigger.dev (agent) |

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                   CLIENT  (Vercel)                    │
│           React + TypeScript + shadcn/ui              │
└────────────────────────┬─────────────────────────────┘
                         │  API Routes
┌────────────────────────▼─────────────────────────────┐
│                 API LAYER  (Vercel)                   │
│          Serverless Functions · Auth · DB             │
└────────────────────────┬─────────────────────────────┘
                         │  Trigger Job
┌────────────────────────▼─────────────────────────────┐
│             AGENT RUNTIME  (Trigger.dev)              │
│                                                       │
│   ┌────────────┐    ┌───────────┐    ┌────────────┐  │
│   │  Scheduler │───▶│  Scraper  │───▶│    LLM     │  │
│   │ (Cron Job) │    │ (Reddit)  │    │  Scoring   │  │
│   └────────────┘    └───────────┘    └─────┬──────┘  │
│                                            │          │
│                                   ┌────────▼───────┐  │
│                                   │  Lead Storage  │  │
│                                   └────────────────┘  │
└───────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- A [Trigger.dev](https://trigger.dev) account
- A [Vercel](https://vercel.com) account
- Reddit API credentials
- OpenAI or Anthropic API key

### Installation

**1. Clone the repo**

```bash
git clone https://github.com/thishumanoid/leadlooking.git
cd leadlooking
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
AUTH_SECRET=

# Database
DATABASE_URL=

# Reddit
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=LeadLooking/1.0

# AI  (pick one)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Trigger.dev
TRIGGER_SECRET_KEY=
```

**4. Start the dev server**

```bash
npm run dev
```

**5. Start the Trigger.dev agent** (separate terminal)

```bash
npx trigger dev
```

Visit [http://localhost:3000](http://localhost:3000) — you're live.

---

## Project Structure

```
leadlooking/
├── src/
│   ├── app/
│   │   ├── api/              # Vercel serverless endpoints
│   │   └── dashboard/        # Lead dashboard pages
│   ├── components/
│   │   ├── ui/               # shadcn/ui primitives
│   │   └── leads/            # Lead cards, filters, score display
│   ├── lib/                  # Utilities, DB client, auth helpers
│   └── trigger/
│       ├── scraper.ts        # Reddit scraping logic
│       ├── analyzer.ts       # LLM scoring pipeline
│       └── scheduler.ts      # Cron job definitions
├── .env.example
└── README.md
```

---

## Self-Hosting

LeadLooking is fully self-hostable.

1. Fork this repository
2. Deploy to Vercel — [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/thishumanoid/leadlooking)
3. Connect your Trigger.dev project and deploy the agent tasks
4. Add your environment variables in the Vercel dashboard

---

## Roadmap

- [x] Core Reddit scraping engine
- [x] LLM intent scoring pipeline
- [x] Lead dashboard with filters
- [x] Trigger.dev scheduled agent
- [ ] Slack and email notifications for new leads
- [ ] Competitor mention tracking
- [ ] Custom scoring rubric per product
- [ ] Chrome extension for one-click outreach
- [ ] Multi-platform support (Hacker News, X, Indie Hackers)

---

## Contributing

Contributions are welcome. Please open an issue before submitting a large PR so we can align on direction.

```bash
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push origin feat/your-feature
```

Then open a Pull Request against `main`.

---

## License

MIT — free to use, modify, and distribute. See [`LICENSE`](./LICENSE) for details.

---

Built by [Himanshu](https://github.com/thishumanoid) 
