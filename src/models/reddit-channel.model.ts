import { RedditPost } from './reddit-post.model';

/**
 * Implements a subreddit channel
 * It is used to send email via Dynamic templates on sendgrid
 */
export interface RedditChannel {
  channelName: string;
  channelUrl: string;
  items: Array<RedditPost>;
}
