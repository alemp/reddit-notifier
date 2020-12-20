import { RedditChannel } from './reddit-channel.model';

/**
 * Implements Mail item
 * This mail item is used to send data via dynamic templates to sendgrid
 */
export interface MailItem {
  /**
   * Name of the user
   */
  user: string;
  /**
   * Email of the user
   */
  email: string;
  /**
   * List of channels (subreddit)
   */
  channels: Array<RedditChannel>;
}
