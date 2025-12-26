
/// PROMPT TO GENERATE PRIVACY POLICY PAGE'S TEXT, change the values inside the brackets [Change Here]

/*
Generate a comprehensive privacy policy for my Chrome extension with the following details:

Extension Information:
- Extension Name: [Your Extension Name]
- Extension Description: [Brief description of what your extension does]
- Developer/Company Name: [Your Name or Company Name]
- Contact Email: [your.email@example.com]
- Website (optional): [yourwebsite.com]

Data Collection & Usage:
- Does your extension collect any user data? [Yes/No]
- If yes, what data do you collect? [e.g., browsing history, form inputs, cookies, user settings, etc.]
- How is the collected data used? [e.g., to provide core functionality, improve user experience, analytics, etc.]
- Is data stored locally or on servers? [Local storage only / Cloud servers / Both]
- Do you use any third-party services? [Yes/No]
- If yes, list them: [e.g., Google Analytics, Firebase, OpenAI API, etc.]

Permissions Required:
List the Chrome permissions your extension requests and why:
- [e.g., "activeTab" - to interact with the current webpage]
- [e.g., "storage" - to save user preferences locally]
- [e.g., "tabs" - to manage browser tabs]

Data Sharing:
- Do you share data with third parties? [Yes/No]
- If yes, with whom and for what purpose? [Specify]
- Do you sell user data? [Yes/No]

User Rights:
- Can users request data deletion? [Yes/No]
- How can users contact you about privacy concerns? [Email/Form/etc.]

*/




import AnimationContainer from "@/components/global/animation-container";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import React from 'react';

const Privacy = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Privacy Policy
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: Lorem ipsum dolor sit amet
                </p>
                <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <h2 className="text-xl font-medium mt-8">
                    Information We Collect
                </h2>

                <h3 className="text-lg mt-4">
                    Personal Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit luctus urna, id pharetra massa suscipit vel.
                </p>

                <h3 className="text-lg font-medium mt-12">
                    Non-Personal Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non suscipit urna, sed porta elit.
                </p>

                <h3 className="text-lg font-medium mt-8">
                    Cookies and Tracking Technologies
                </h3>
                <p className="mt-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lorem sed ipsum sodales malesuada.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    How We Use Your Information
                </h2>

                <h3 className="text-lg mt-8">
                    Provide and Improve Services
                </h3>
                <div className="mt-8">
                    Lorem ipsum dolor sit amet:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Consectetur adipiscing elit.</li>
                        <li>Sed do eiusmod tempor incididunt.</li>
                    </ul>
                </div>

                <h3 className="text-xl font-medium mt-12">
                    Communication
                </h3>
                <div className="mt-8">
                    Lorem ipsum dolor sit amet:
                    <ul className="list-disc text-muted-foreground ml-8">
                        <li>Ut enim ad minim veniam.</li>
                        <li>Quis nostrud exercitation ullamco.</li>
                    </ul>
                </div>

                <h3 className="text-lg mt-8">
                    Analytics and Research
                </h3>
                <div className="mt-8">
                    Lorem ipsum dolor sit amet:
                    <ul className="list-disc text-muted-foreground ml-8">
                        <li>Duis aute irure dolor in reprehenderit.</li>
                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-medium mt-12">
                    How We Share Your Information
                </h2>

                <h3 className="text-lg mt-8">
                    Service Providers
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae semper leo.
                </p>

                <h3 className="text-lg mt-8">
                    Legal Requirements
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                </p>

                <h3 className="text-lg mt-8">
                    Business Transfers
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula nec arcu varius dictum.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Data Security
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet, justo in gravida cursus.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Data Retention
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend tortor a sem tempor.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Your Rights and Choices
                </h2>

                <h3 className="text-lg mt-8">
                    Access and Update
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet eros vitae justo placerat dignissim.
                </p>

                <h3 className="text-lg mt-8">
                    Opt-Out
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non massa id mi ultrices gravida.
                </p>

                <h3 className="text-lg mt-8">
                    Data Deletion
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam risus at lacus vulputate.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Children's Privacy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus sapien non libero hendrerit.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    International Data Transfers
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo vel ligula ullamcorper.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Changes to This Privacy Policy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique nulla vitae sem fermentum.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Contact Us
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.
                </p>

                <p className="mt-8 font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default Privacy;
