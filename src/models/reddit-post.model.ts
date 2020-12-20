/**
 * Implements a post from reddit
 * It is used in dynamic templates on sendgrid
 */
export interface RedditPost {
  channel: string;
  image: string;
  description: string;
  likes: string;
}
