import { Zap, LineChartIcon, Link2Icon, LockIcon, NewspaperIcon, QrCodeIcon } from "lucide-react";

type NavLink = {
  title: string;
  href: string;
  menu?: Array<{
    title: string;
    href: string;
    tagline?: string;
    icon?:any
  }>;
};

export const NAV_LINKS: NavLink[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Features",
        href: "/features",
        menu: [
            {
                title: "Lorem ipsum1",
                tagline: "eiusmod tempor incididunt ut.",
                href: "/",
                icon: Zap,
            },
            {
                title: "Lorem ipsum2",
                tagline: "eiusmod tempor incididunt ut.",
                href: "/",
                icon: Zap,
            },
            {
                title: "Lorem ipsum3",
                tagline: "eiusmod tempor incididunt ut.",
                href: "/",
                icon: Zap,
            },
            {
                title: "Lorem ipsum4",
                tagline: "eiusmod tempor incididunt ut.",
                href: "/",
                icon: Zap,
            },
        ],
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    
    
    // {
    //     title: "Resources",
    //     href: "/resources",
    //     menu: [
    //         {
    //             title: "Blog",
    //             tagline: "Read awesome articles",
    //             href: "/resources/blog",
    //             icon: NewspaperIcon,
    //         },
    //         {
    //             title: "FAQs",
    //             tagline: "Get answers to your questions.",
    //             href: "/resources/help",
    //             icon: HelpCircleIcon,
    //         },
    //     ]
    // },
    {
        title: "Any Suggestion?",
        href: "/feedback",
    },
    // {
    //     title: "Changelog",
    //     href: "/changelog",
    // },
];