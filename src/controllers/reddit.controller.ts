import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import { HandleError } from '../middlewares/handle-errors.middleware';
import { MailItem } from '../models/mail-item.model';
import { RedditChannel } from '../models/reddit-channel.model';
import { RedditPost } from '../models/reddit-post.model';
import { DatabaseFileController } from './database.controller';
import { MailController } from './mail.controller';

dotenv.config();

/**
 * Implements Reddit calls
 */
export class RedditController {
  /**
   * Reddit client ID
   */
  clientId: string;
  /**
   * Reddit client secret
   */
  clientSecret: string;
  /**
   * Reddit username
   */
  username: string;
  /**
   * Reddit password
   */
  password: string;
  /**
   * Reddit OAuth token
   */
  token: string;

  /**
   * Default user agent
   */
  userAgent = 'com.reddit-notifier:v.1.0 (by /u/alemprj)';

  mailController = new MailController();
  dbController = new DatabaseFileController();

  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID;
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET;
    this.username = process.env.REDDIT_DEV_USER;
    this.password = process.env.REDDIT_DEV_PWD;
  }

  /**
   * Authenticate user on Reddit
   */
  async authenticate() {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', this.username);
    formData.append('password', this.password);

    const headers = {
      ...formData.getHeaders(),
      'User-Agent': this.userAgent,
      Authorization: `Basic ${Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')}`,
    };

    const url = `${process.env.REDDIT_URL}/api/v1/access_token`;

    try {
      const response: AxiosResponse = await axios.post(
        url,
        formData,
        {
          headers,
        },
      );

      if (response.status !== 200) {
        throw new HandleError(response.status, response.statusText);
      }

      const { access_token } = response.data;

      if (access_token) {
        this.token = access_token;
      } else {
        throw new HandleError(500, 'error trying to get token');
      }

      return response.data;
    } catch (error) {
      throw new HandleError(500, error.message);
    }
  }

  /**
   * Get last posts from subreddit
   * @param channel - subreddit name
   */
  async getTopPostsFromChannel(channel: string): Promise<Array<RedditPost>> {
    try {
      if (!this.token) {
        await this.authenticate();
      }

      const url = `https://oauth.reddit.com/r/${channel}/top.json?limit=3&t=day`;

      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          Authorization: `bearer ${this.token}`,
        },
      });

      if (response.status === 200) {
        return response.data.data.children.map((item: any) => ({
          channel: item.data.subreddit,
          description: item.data.title,
          image: item.data.thumbnail,
          likes: item.data.ups,
        } as RedditPost));
      }
    } catch (error) {
      throw new HandleError(500, error.message);
    }
  }

  /**
   * Get new posts from all channels on the database
   */
  async getTopPostFromChannels(): Promise<{ [key: string]: any }> {
    try {
      const db = await this.dbController.open();

      const response: { [key: string]: any } = {};

      for (const channel of db.channels) {
        // check if there is user waiting for this channel update
        const users = db.users.filter(
          user => user.newsletter && user.channels.findIndex(item => item.name === channel.name) > -1,
        );

        if (users.length > 0) {
          // get last posts
          response[channel.name] = await this.getTopPostsFromChannel(channel.name);
        }
      }

      return response;
    } catch {
      throw new HandleError(500, 'Error trying to get channels');
    }
  }

  /**
   * Send new posts by email
   */
  async sendTopPostsByEmail(): Promise<string> {
    try {
      const db = await this.dbController.open();

      const channels = await this.getTopPostFromChannels();

      // prepare users to receive posts
      const items: { [key: string]: MailItem } = {};

      Object.values(channels).forEach(channel => {
        for (const user of db.users) {
          if (user.newsletter) {
            if (user.channels.findIndex(item => item.name === channel[0].channel) > -1) {
              const channelToAdd: RedditChannel = {
                channelName: channel[0].channel,
                channelUrl: `${process.env.REDDIT_URL}/r/${channel[0].channel}/top`,
                items: channel,
              };

              if (!items[user.id]) {
                items[user.id] = {
                  user: user.name,
                  email: user.email,
                  channels: [
                    channelToAdd,
                  ],
                };
              } else {
                items[user.id] = {
                  ...items[user.id],
                  channels: [
                    ...items[user.id].channels,
                    channelToAdd,
                  ],
                };
              }
            }
          }
        }
      });

      const mailsToSend = Object.entries(items);

      // @ts-ignore
      for (const [key, item] of mailsToSend) {
        await this.mailController.send(item.email, item.user, item.channels);
      }

      return 'emails were sent';
    } catch {
      throw new HandleError(500, 'Error sending email');
    }
  }
}
