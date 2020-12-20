import sendgrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail/src/mail';
import { HandleError } from '../middlewares/handle-errors.middleware';
import { RedditChannel } from '../models/reddit-channel.model';

export class MailController {
  apiKey = process.env.SENDGRID_API_KEY;
  templateId = process.env.SENDGRID_TEMPLATE_ID;
  emailFrom = process.env.SENDGRID_DEFAULT_FROM;

  async send(to: string, name: string, channels: RedditChannel[]) {
    try {
      sendgrid.setApiKey(this.apiKey);

      const msg: MailDataRequired = {
        from: this.emailFrom,
        templateId: this.templateId,
        personalizations: [
          {
            to,
            dynamicTemplateData: {
              user: name,
              channels,
            },
          },
        ],
      };

      return await sendgrid.send(msg);
    } catch {
      throw new HandleError(500, 'Error sending email');
    }

  }
}
