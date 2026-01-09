import { MailtrapClient } from 'mailtrap';
import { render } from '@react-email/render';
import LeadDigestEmail, { LeadDigestEmailProps } from '@/emails/LeadDigestEmail';

const mailtrap = new MailtrapClient({
  token: process.env.MAILTRAP_API_KEY!,
});

const sender = {
  email: 'hello@leadlooking.com',
  name: 'LeadLooking',
};

export async function sendDigestEmail(
  toEmail: string,
  keyword: string,
  leads: LeadDigestEmailProps['leads'],
  campaignId: string
) {
  try {
    const html = await render(LeadDigestEmail({ keyword, leads, campaignId }));

    const result = await mailtrap.send({
      from: sender,
      to: [{ email: toEmail }],
      subject: `LeadLooking: New Leads Found`,
      html: html,
    });
    console.log(`✅ Digest email sent to ${toEmail} for keyword "${keyword}"`);
    console.log('👉 Mailtrap Result:', result);
  } catch (error) {
    console.error('❌ Error sending digest email:', error);
  }
}
