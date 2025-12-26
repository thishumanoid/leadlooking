# ⚡extFast - Web App Boilerplate

Welcome to extFast! This repo is built with NextJs + Shadcn UI + Supabase.

## Go to [Browser Extension Boilerplate](https://github.com/extFast/extension-boilerplate)

## Go to [Documentation](https://extfast-docs.hashnode.space/docs/getting-started)



##  Core Tech

- **Framework**:[ Next.js](https://nextjs.org/docs)
- **UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Payments**: [Polar.sh](https://polar.sh/docs/introduction)
- **Email**: [Resend](https://resend.com/docs/introduction)
- **Typescript**: Saves a lot of testing headache & autocomplete while writing code


## Getting Started

### 1. Clone the Repository

You have three options to get started:

**Option A: Use as Template (Recommended)**
- Click the "Use this template" button at the top of this repository
- Create your own repository from this template

**Option B: Clone via Git**
```bash
git clone https://github.com/extFast/webapp-boilerplate.git [YOUR_APP_NAME]
cd [YOUR_APP_NAME]
npm install
git remote remove origin
```

**Option C: Download ZIP**
- Click "Code" → "Download ZIP"
- Extract and navigate to the folder
- Run `npm install`

## 2. Environment Setup

Rename `.env.example` file to `.env.development`

### 3. Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

### 4. Connect Services

Rename `.env.example` to `.env.development` and configure the following variables:

```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SECRET_KEY=

# POLAR
POLAR_ACCESS_TOKEN=
# use "sandbox" in development and "production" when going live
POLAR_SERVER=sandbox
POLAR_CHECKOUT_SUCCESS_URL=
NEXT_PUBLIC_POLAR_PRODUCT_A=
NEXT_PUBLIC_POLAR_PRODUCT_B=
POLAR_WEBHOOK_SECRET=

# RESEND
RESEND_API_KEY=

# YOUR APP
NEXT_PUBLIC_WEB_APP_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_SUCCESS_URL=http://localhost:3000/auth/auth-success
NEXT_PUBLIC_PASSWORD_UPDATE_URL=http://localhost:3000/auth/update-password
```

#### 4.1 Supabase Setup (if not already done)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to the SQL Editor and run this command to create the required table:

```sql
CREATE TABLE PremiumUsers (
  user_email TEXT PRIMARY KEY,
  subscription_status TEXT NOT NULL,
  plan_type TEXT,
  credits_used INTEGER,
  subscribed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_id TEXT,
  customer_id TEXT
);
```

or if you want to create table manually then try to keep it in this format:  
Table name should be: `PremiumUsers`
columns are like these:

`user_email`: text (not nullable)  
`subscription_status`: text (not nullable)  
`plan_type`: text (can be null)  
`credits_used`: number (can be null)  
`subscribed_at`: timestamptz (can be null)  
`expires_at`: timestamptz (can be null)  
`created_at`: timestamptz (can be null)  
`subscription_id`: text (can be null)  
`customer_id`: text (can be null)  

like this screenshot:
<img width="1920" height="450" alt="Image" src="https://github.com/user-attachments/assets/40a0f940-6c0b-4495-9682-968ad4176f18" />

4. Copy your Project URL and paste it into `NEXT_PUBLIC_SUPABASE_URL`
5. Copy your Publishable API Key and paste it into `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
6. Copy your Secret API Key (service_role key) and paste it into `SUPABASE_SECRET_KEY`
7. Enable Google authentication:
   - Go to Authentication → Providers
   - Enable Google OAuth provider

#### 4.2 Polar.sh Setup - [docs](https://polar.sh/docs/guides/nextjs) or [video tutorial](https://www.youtube.com/watch?v=7oQr-Z-sCYU)

1. Create a sandbox account at [sandbox.polar.sh](https://sandbox.polar.sh/)
2. Create your products and get their IDs - [docs](https://polar.sh/docs/features/products)
3. Copy your access token and paste it into `POLAR_ACCESS_TOKEN`
4. Set up your product IDs in `NEXT_PUBLIC_POLAR_PRODUCT_A` and `NEXT_PUBLIC_POLAR_PRODUCT_B`
5. Configure webhook secret in `POLAR_WEBHOOK_SECRET`


#### 4.3 Replace Example URLs

Throughout the codebase, replace `example.com` with your actual domain name.

### 5. `context/AuthContext.tsx`

#### Using AuthContext

Access user authentication and subscription data in any component:

```tsx
import { useAuth } from '@/context/AuthContext';

export default function UserDetails() {
  const { user, subscription } = useAuth();

  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Plan: {subscription?.subscription_id}</p>
    </div>
  );
}
```

#### App Configuration

Edit `config.ts` to customize:
- App name
- Footer description
- Other metadata

## Customization Guide

### Logo

Replace the logo by editing `components/YourLogo.tsx` and pasting your SVG code. Need help creating a logo? Use this [Figma template](https://www.figma.com/community/file/1577982862611734351/chrome-web-store-assets-kit-extfast).

### Theme Colors

1. Visit [ui.shadcn.com/themes](https://ui.shadcn.com/themes)
2. Choose your theme color (green, rose, orange, etc.)
3. Copy the generated CSS code
4. Paste it into your `globals.css` file (only replace the `.root` & `.dark` variables)

### SEO Configuration

**Sitemap**
- ✅ Automatically generated using `next-sitemap.config.js`

**Metadata**
- Edit `app/layout.tsx`
- Update title, description, and other metadata

## Deployment Checklist

Before deploying to production:

- [ ] Replace `POLAR_SERVER="sandbox"` with `"production"` in `.env.development` or `.env.production` file
- [ ] Update all Polar API keys from sandbox to production keys
- [ ] Replace all `localhost` URLs with your production domain
- [ ] Add your production web app domain as a callback redirect URL in Supabase Dashboard (Authentication → URL Configuration)
- [ ] Update all `example.com` references with your actual domain
- [ ] Build and test: `npm run build`
- [ ] Deploy wherever you want!

## Build for Production

```bash
npm run build
npm start
```

## ☺️ Need Help?

Send me an email at: neuhiman@gmail.com (i will try my best to reply ASAP)

---

Built with ❤️ for developers who want to build & monetize fast.