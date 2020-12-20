import sendgrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail/src/mail';
import { HandleError } from '../middlewares/handle-errors.middleware';
import { RedditChannel } from '../models/reddit-channel.model';

/**
 * Implements a controller to send email via sendgrid
 */
export class MailController {
  /**
   * API key for sendgrid
   */
  apiKey = process.env.SENDGRID_API_KEY;
  /**
   * Template ID for sendgrid
   * @remarks
   * You'll need to create a [dynamic template](https://sendgrid.com/dynamic_templates) on sendgrid
   */
  templateId = process.env.SENDGRID_TEMPLATE_ID;
  /**
   * Default email to work as from email
   */
  emailFrom = process.env.SENDGRID_DEFAULT_FROM;

  /**
   * Send email using sendgrid
   * @param to - email to send
   * @param name - name of the user
   * @param channels - list of channels
   */
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
