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
  contactEmail: 'neuhiman@gmail.com',

  paymentProvider: 'polar',

  colors: {
    // REQUIRED — choose either light/dark.
    theme: 'dark',
  },
} as ConfigProps;

export default config;
