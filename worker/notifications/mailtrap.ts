import { MailtrapClient } from 'mailtrap';
import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/WelcomeEmail';
import LeadDigestEmail, { LeadDigestEmailProps } from '@/emails/LeadDigestEmail';

const mailtrap = new MailtrapClient({
  token: process.env.MAILTRAP_API_KEY!,
});

const sender = {
  email: 'hello@leadlooking.com',
  name: 'LeadLooking',
};

export async function sendWelcomeEmail(toEmail: string) {
  try {
    const html = await render(WelcomeEmail({ userEmail: toEmail }));

    const result = await mailtrap.send({
      from: sender,
      to: [{ email: toEmail }],
      subject: `Welcome to LeadLooking! Let's Get You Set Up`,
      html: html,
    });
    console.log(`✅ Welcome email sent to ${toEmail}`);
    console.log('👉 Mailtrap Result:', result);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
}

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
      subject: `New Leads Found!`,
      html: html,
    });
    console.log(`✅ Digest email sent to ${toEmail} for keyword "${keyword}"`);
    console.log('👉 Mailtrap Result:', result);
  } catch (error) {
    console.error('❌ Error sending digest email:', error);
  }
}
