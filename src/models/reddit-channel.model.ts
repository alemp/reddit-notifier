import { RedditPost } from './reddit-post.model';

export interface RedditChannel {
  channelName: string;
  channelUrl: string;
  items: Array<RedditPost>;
}
