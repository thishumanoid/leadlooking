import { MailtrapClient } from 'mailtrap';

const mailtrap = new MailtrapClient({
  token: process.env.MAILTRAP_API_KEY!,
});

const sender = {
  email: 'hello@demomailtrap.co',
  name: 'Mailtrap Test',
};

const recipients = [
  {
    email: 'iconicmasti@gmail.com',
  },
];

export async function sendLeadEmail(redditPostURL: string, chatURL: string) {
  const emailContent = createEmail(redditPostURL, chatURL);

  try {
    const result = await mailtrap.send({
      from: sender,
      to: recipients,
      subject: 'We found a new lead!',
      html: emailContent,
    });
    console.log('👉👉👉', result);
  } catch (error) {
    console.log('error', error);
  }
}

export function createEmail(redditPostURL: string = '', chatURL: string = '') {
  const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Found</title>
    <!--[if !mso]><!-->
    <style>
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .stack { display: block !important; width: 100% !important; margin-bottom: 10px !important; text-align: center !important; }
            .btn { display: inline-block !important; text-align: center !important; max-width: 90% !important; }
            .button-container { padding-bottom: 0 !important; text-align: center !important; }
        }
    </style>
    <!--<![endif]-->
</head>
<body style="margin-top:0; margin-bottom:0; margin-left:0; margin-right:0; padding-top:0; padding-bottom:0; padding-left:0; padding-right:0; background-color:#f5f5f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <center style="width:100%; background-color:#f5f5f5; padding-top:40px; padding-bottom:40px; padding-left:0; padding-right:0;">
        
        <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" 
               style="width: 100%; max-width: 600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1); margin-top:0; margin-bottom:0; margin-left:auto; margin-right:auto;">
            
            <tr>
                <td style="padding-top:32px; padding-bottom:32px; padding-left:40px; padding-right:40px; border-bottom: 1px solid #e5e5e5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                    <h1 style="margin-top:0; margin-bottom:0; margin-left:0; margin-right:0; font-size:24px; color:#1a1a1a; font-weight: 600;">New Lead Found</h1>
                </td>
            </tr>
            
            <tr>
                <td style="padding-top:32px; padding-bottom:32px; padding-left:40px; padding-right:40px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                    <p style="font-size:16px; color:#333333; margin-top:0; margin-bottom:20px; margin-left:0; margin-right:0; line-height: 1.5;">Hi there,</p>
                    <p style="font-size:16px; color:#333333; margin-top:0; margin-bottom:24px; margin-left:0; margin-right:0; line-height: 1.5;">We found a relevant discussion on Reddit matching your keyword:</p>
                    
                    <div style="background-color:#f8f9fa; border-left:4px solid #4a90e2; padding-top:16px; padding-bottom:16px; padding-left:20px; padding-right:20px; border-radius:4px; margin-top:0; margin-bottom:32px; margin-left:0; margin-right:0;">
                        <span style="font-size:12px; font-weight:600; color:#666666; text-transform:uppercase; display: block; letter-spacing: 0.5px;">Keyword</span>
                        <div style="font-size:18px; font-weight:600; color:#1a1a1a; margin-top:4px; margin-bottom:0; margin-left:0; margin-right:0;">Looking for SEO expert</div>
                    </div>
                    
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td class="button-container" style="padding-top:0; padding-bottom:10px; padding-left:0; padding-right:0; text-align:center;">
                                
                                <div class="stack" style="margin-top:0; margin-bottom:10px; margin-left:0; margin-right:0; text-align:center;">
                                    <a href="${redditPostURL}" class="btn" 
                                       style="background-color:#4a90e2; color:#ffffff; padding-top:12px; padding-bottom:12px; padding-left:20px; padding-right:20px; text-decoration:none; font-size:14px; font-weight:600; border-radius:6px; display:inline-block; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; min-width:140px; text-align:center;">
                                       View Post
                                    </a>
                                </div>
                                
                                <div class="stack" style="margin-top:0; margin-bottom:10px; margin-left:0; margin-right:0; text-align:center;">
                                    <a href="${chatURL}" class="btn" 
                                       style="border-width:2px; border-style:solid; border-color:#4a90e2; color:#4a90e2; background-color:#ffffff; padding-top:10px; padding-bottom:10px; padding-left:20px; padding-right:20px; text-decoration:none; font-size:14px; font-weight:600; border-radius:6px; display:inline-block; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; min-width:140px; text-align:center;">
                                       Open Chat
                                    </a>
                                </div>
                                
                                <div class="stack" style="margin-top:0; margin-bottom:10px; margin-left:0; margin-right:0; text-align:center;">
                                    <a href="https://extfast.web.app/" class="btn" 
                                       style="border-width:2px; border-style:solid; border-color:#e5e5e5; color:#666666; background-color:#ffffff; padding-top:10px; padding-bottom:10px; padding-left:20px; padding-right:20px; text-decoration:none; font-size:14px; font-weight:600; border-radius:6px; display:inline-block; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; min-width:140px; text-align:center;">
                                       Dashboard
                                    </a>
                                </div>
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr>
                <td style="padding-top:24px; padding-bottom:24px; padding-left:40px; padding-right:40px; background-color:#f8f9fa; border-top:1px solid #e5e5e5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                    <p style="margin-top:0; margin-bottom:10px; margin-left:0; margin-right:0; font-size:13px; color:#666666; line-height:1.5;">You received this because you follow "{{KEYWORD}}".</p>
                    <a href="https://extfast.web.app/settings" style="color:#4a90e2; text-decoration:underline; font-size:13px;">Unsubscribe</a>
                </td>
            </tr>
        </table>
        
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top:20px; margin-bottom:0; margin-left:0; margin-right:0; width: 100%; max-width: 600px;">
            <tr>
                <td align="center" style="font-size:12px; color:#999999; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; line-height:1.5;">
                    LeadLooking - New Ashok Nagar, Delhi, 110096
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

  return EMAIL_TEMPLATE;
}
