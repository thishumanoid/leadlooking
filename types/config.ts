export type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  footerDescription: string
  appUrl: string
  chromeWebStoreUrl?: string
  firefoxStoreUrl?: string
  extensionDemoVideo?: string
  contactEmail: string,

  paymentProvider: "stripe" | "polar" | 'lemonSqueezy'
  
  stripe: {
    plans: {
      isFeatured?: boolean;
      priceId: string;
      name: string;
      description?: string;
      price: number;
      priceAnchor?: number;
      features: {
        name: string;
      }[];
    }[];
  };
  
  colors: {
    theme: Theme;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
}