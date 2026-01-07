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
  Button,
} from '@react-email/components';
import * as React from 'react';

interface Lead {
  title: string;
  subreddit: string;
  url: string;
  leadScore: number;
  content?: string;
  createdAt?: string;
}

export interface LeadDigestEmailProps {
  keyword: string;
  leads: Lead[];
  campaignId?: string;
}

export const LeadDigestEmail = ({
  keyword = 'example keyword',
  leads = [
    {
      title: 'Need help with CRM',
      subreddit: 'marketing',
      url: 'https://reddit.com/r/marketing/...',
      leadScore: 85,
      content: 'I am looking for a CRM that can help me with...',
    },
    {
      title: 'Best CRM for startups?',
      subreddit: 'startups',
      url: 'https://reddit.com/r/startups/...',
      leadScore: 75,
      content: 'We are a small startup and need a CRM...',
    },
  ],
  campaignId,
}: LeadDigestEmailProps) => {
  const displayLeads = leads.slice(0, 10);
  const hasMore = leads.length > 10;
  return (
    <Html>
      <Head />
      <Preview>{leads.length.toString() ?? ''} New leads found!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Leads Found</Heading>
          <Text style={text}>
            We found {leads.length} new discussions on Reddit matching your keyword:
          </Text>
          <Section style={keywordBox}>
            <Text style={keywordLabel}>KEYWORD</Text>
            <Text style={keywordText}>{keyword}</Text>
          </Section>
          <Hr style={hr} />
          {displayLeads.map((lead, index) => (
            <Section key={index} style={leadContainer}>
              <div style={scoreBadge}>Score: {lead.leadScore}</div>
              <Text style={subreddit}>
                r/{lead.subreddit} • {lead.createdAt ? formatTimeAgo(lead.createdAt) : 'Recently'}
              </Text>
              <Heading as="h3" style={leadTitle}>
                <Link href={lead.url} style={link}>
                  {lead.title}
                </Link>
              </Heading>
              {lead.content && (
                <Text style={leadContent}>
                  {lead.content.length > 150
                    ? `${lead.content.substring(0, 150)}...`
                    : lead.content}
                </Text>
              )}
              <Button href={lead.url} style={button}>
                View Post on Reddit
              </Button>
            </Section>
          ))}
          {hasMore && (
            <Section
              style={{ textAlign: 'center' as const, marginTop: '20px', marginBottom: '20px' }}
            >
              <Button
                href={`https://leadlooking.com/campaigns/${campaignId}`}
                style={{ ...button, backgroundColor: '#1a1a1a' }}
              >
                View all {leads.length} leads
              </Button>
            </Section>
          )}
          <Hr style={hr} />
          <Text style={footer}>
            Sent via <strong>LeadLooking</strong>
          </Text>
          <Link href="https://leadlooking.com/settings" style={unsubscribe}>
            Unsubscribe
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default LeadDigestEmail;

const formatTimeAgo = (date: Date | string) => {
  const d = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInMins = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMins < 1) return 'Just now';
  if (diffInMins < 60) return `${diffInMins} min ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${diffInDays}d ago`;
};

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 20px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 20px',
};

const keywordBox = {
  backgroundColor: '#fef2f2',
  borderLeft: '4px solid #dc2626',
  borderRadius: '4px',
  padding: '16px 20px',
  marginBottom: '32px',
};

const keywordLabel = {
  color: '#666666',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0',
};

const keywordText = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  margin: '4px 0 0',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '20px 0',
};

const leadContainer = {
  marginBottom: '30px',
  padding: '20px',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  border: '1px solid #eee',
};

const scoreBadge = {
  display: 'inline-block',
  backgroundColor: '#fee2e2',
  color: '#991b1b',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: '600',
  marginBottom: '8px',
};

const subreddit = {
  color: '#666',
  fontSize: '12px',
  margin: '0 0 4px',
};

const leadTitle = {
  fontSize: '18px',
  margin: '0 0 10px',
  fontWeight: '600',
};

const link = {
  color: '#dc2626',
  textDecoration: 'none',
};

const leadContent = {
  fontSize: '14px',
  color: '#555',
  lineHeight: '1.5',
  margin: '0 0 16px',
};

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 20px',
};

const footer = {
  color: '#999999',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '20px 0 10px',
};

const unsubscribe = {
  color: '#dc2626',
  fontSize: '12px',
  textDecoration: 'underline',
  display: 'block',
  textAlign: 'center' as const,
};
