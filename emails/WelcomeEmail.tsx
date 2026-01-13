import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

export interface WelcomeEmailProps {
  userEmail?: string;
}

export const WelcomeEmail = ({ userEmail = 'user@example.com' }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to LeadLooking Premium 🥳</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to LeadLooking Premium 🥳</Heading>
          <Text style={text}>We're excited to help you find quality leads on autopilot.</Text>

          <Section style={instructionBox}>
            <Heading as="h2" style={h2}>
              Important: Action Required
            </Heading>
            <Text style={text}>
              Our system will notify you immediately when new leads are found. To make sure these
              emails always reach your inbox:
            </Text>

            <Text style={stepTitle}>1. Add us to your contacts</Text>
            <Text style={stepText}>
              Save <strong>hello@leadlooking.com</strong> to your address book or contacts list
              right now.
            </Text>

            <Text style={stepTitle}>2. Whitelist our email</Text>
            <Text style={stepText}>
              Open your email settings, create a filter for "hello@leadlooking.com" in the "From"
              field, then select <strong>"Always deliver to inbox"</strong> or a similar option.
            </Text>
          </Section>

          <Text style={text}>
            If you have any questions or need assistance, just visit your LeadLooking dashboard.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            Sent via <strong>LeadLooking</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  padding: '24px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  margin: '0 auto',
  padding: '24px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 20px',
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 16px',
};

const text = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 24px',
};

const instructionBox = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '32px',
};

const stepTitle = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  margin: '20px 0 8px',
};

const stepText = {
  color: '#475569',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '20px 0',
};

const footer = {
  color: '#999999',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '20px 0 10px',
};
