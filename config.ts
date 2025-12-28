// docs: https://extfast-docs.hashnode.space/docs/configts

import type { ConfigProps } from './types/config';


/// this is the file where you should customize all the global level stuff like app name and payment provider

const config = {
  // REQUIRED
  appName: 'LeadLooking',
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: 'The gratest chrome extension ever built description.',

  /// REQUIRED: a very short description of your app under 5 words, this will appear in footer
  footerDescription: 'Lorem ipsum dollar sit',
  //// to change logo, search "YourLogo.tsx" file

  appUrl: 'https://example.com',

  chromeWebStoreUrl: 'your_extension_installation_page_url_here',
  firefoxStoreUrl: 'your_extension_installation_page_url_here',

  extensionDemoVideo: '/',

  // REQUIRED: to recive email notification from contact form page
  contactEmail: 'support@yoursaas.com',

  // REQUIRED: chose either 'stripe' or 'polar' or 'lemonSqueezy'
  paymentProvider: 'stripe',

  colors: {
    // REQUIRED — choose either light/dark.
    theme: 'dark',
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: '/auth',
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: '/auth/auth-success',
  },
} as ConfigProps;

export default config;
