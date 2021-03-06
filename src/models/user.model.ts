import { Channel } from './channel.model';

/**
 * Implements user model
 */
export interface User {
  /**
   * user ID
   */
  id: string;
  /**
   * user name
   */
  name: string;
  /**
   * user email
   */
  email: string;
  /**
   * newsletter
   */
  newsletter: boolean;
  /**
   * user channels
   */
  channels?: Array<Channel>;
}
