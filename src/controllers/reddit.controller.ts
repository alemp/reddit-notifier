import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import { HandleError } from '../middlewares/handle-errors.middleware';

dotenv.config();

/**
 * Implements Reddit calls
 */
export class RedditController {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  token: string;

  authEndpoint = `${process.env.REDDIT_API_URL}/access_token`;

  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID;
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET;
    this.username = process.env.REDDIT_DEV_USER;
    this.password = process.env.REDDIT_DEV_PWD;
  }

  async authenticate() {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', this.username);
    formData.append('password', this.password);

    const headers = {
      ...formData.getHeaders(),
      'User-Agent': 'com.reddit-notifier:v.1.0 (by /u/alemprj)',
      Authorization: `Basic ${Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')}`,
    };

    try {
      const response: AxiosResponse = await axios.post(
        this.authEndpoint,
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
      throw new HandleError(error.statusCode, error.message);
    }
  }
}
