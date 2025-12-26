
/// PROMPT TO GENERATE TERMS AND CONDITIONS PAGE'S TEXT, change the values inside the brackets [Change Here]

/*
Create terms and conditions for my Chrome extension called [EXTENSION_NAME].

Extension description: [Briefly describe what your extension does]

Key features: [List main features users will use]

Usage restrictions: [Describe any prohibited uses, like "don't use for illegal purposes" or specific limitations]

Account/subscription info: 
[Choose one:
- Free extension, no account needed
- Requires account/login
- Has paid features: [describe]
- Not applicable]

Contact email: [your-email@example.com]

Please write clear, legally sound terms and conditions that cover: acceptable use, disclaimers, limitations of liability, termination rights, and any other standard terms.

*/


import AnimationContainer from "@/components/global/animation-container";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import Link from "next/link";

const TermsPage = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Terms and Conditions
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: Lorem ipsum 2024
                </p>
                <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <h2 className="text-xl font-medium mt-8">Lorem Ipsum</h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                </p>

                <h2 className="text-xl font-medium mt-12">Dolor Sit Amet</h2>
                <p className="mt-8 text-muted-foreground">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </p>

                <h2 className="text-xl font-medium mt-12">Consectetur Adipiscing</h2>

                <h3 className="text-lg mt-8">Eligendi</h3>
                <p className="mt-8">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>

                <h3 className="text-lg mt-8">Account Registration</h3>
                <div className="mt-8">
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.</li>
                        <li>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.</li>
                    </ul>
                </div>

                <h3 className="text-lg mt-8">Acceptable Use</h3>
                <div className="mt-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit:
                    <ul className="list-disc text-muted-foreground ml-8">
                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                        <li>Duis aute irure dolor in reprehenderit in voluptate velit esse.</li>
                        <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-medium mt-12">Shortening & Management</h2>

                <h3 className="text-lg mt-8">URL Shortening</h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                </p>

                <h3 className="text-lg mt-8">Analytics</h3>
                <p className="mt-8 text-muted-foreground">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <h3 className="text-lg mt-8">QR Code Generation</h3>
                <p className="mt-8 text-muted-foreground">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h3 className="text-lg mt-8">Business Transfers</h3>
                <p className="mt-8 text-muted-foreground">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                </p>

                <h2 className="text-xl font-medium mt-12">User Content</h2>

                <h3 className="text-lg mt-8">Ownership</h3>
                <p className="mt-8 text-muted-foreground">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
                </p>

                <h2 className="text-xl font-medium mt-12">Responsibility</h2>
                <p className="mt-8 text-muted-foreground">
                    Et harum quidem rerum facilis est et expedita distinctio.
                </p>

                <h2 className="text-xl font-medium mt-12">Privacy</h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet. Please review our <Link href="/privacy" className="underline">Privacy Policy</Link> for more information.
                </p>

                <h2 className="text-xl font-medium mt-12">Termination</h2>
                <p className="mt-8 text-muted-foreground">
                    Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.
                </p>

                <h2 className="text-xl font-medium mt-12">Disclaimers & Limitations</h2>

                <h3 className="text-lg mt-8">No Warranties</h3>
                <p className="mt-8 text-muted-foreground">
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.
                </p>

                <h3 className="text-lg mt-8">Limitation of Liability</h3>
                <p className="mt-8 text-muted-foreground">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                </p>

                <h2 className="text-xl font-medium mt-12">Governing Law</h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <h2 className="text-xl font-medium mt-12">Contact Us</h2>
                <p className="mt-8 text-muted-foreground">
                    For any inquiries, contact us at lorem@ipsum.com.
                </p>

                <p className="mt-8 font-medium">
                    By using this service, you acknowledge that you agree to these lorem ipsum terms.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default TermsPage;