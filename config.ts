// docs: https://extfast-docs.hashnode.space/docs/configts

import type { ConfigProps } from './types/config';

/// this is the file where you should customize all the global level stuff like app name and payment provider

const config = {
  // REQUIRED
  appName: 'LeadLooking',
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: 'Reddit Marketing Made Easy.',

  /// REQUIRED: a very short description of your app under 5 words, this will appear in footer
  footerDescription: 'Track, Track, Track, Track',
  //// to change logo, search "YourLogo.tsx" file

  appUrl: 'https://www.leadlooking.com',

  chromeWebStoreUrl:
    'https://chromewebstore.google.com/detail/tagfast-mark-profiles-as/olohoaikbpcfhkbcolocphodjbdjnign?utm_source=leadlooking',
  firefoxStoreUrl: 'https://addons.mozilla.org/en-US/firefox/addon/tagfast-track-leads/',

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
