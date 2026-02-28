export interface Tool {
  slug: string;
  title: string;
  description: string;
  path: string;
  icon?: string;
  isNew?: boolean;
}

export const tools: Tool[] = [
  {
    slug: 'linkedin-carousel-generator',
    title: 'LinkedIn Carousel Generator',
    description:
      'Create stunning LinkedIn carousels for real estate in minutes. Fully editable slides, instant PDF download, 100% free.',
    path: '/tools/linkedin-carousel-generator-for-real-estate',
    isNew: true,
  },
];

export function getAllTools(): Tool[] {
  return tools;
}
