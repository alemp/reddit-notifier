import { RedditChannel } from './reddit-channel.model';

export interface MailItem {
  user: string;
  email: string;
  channels: Array<RedditChannel>;
}
