import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cron from 'node-cron';
import { RedditController } from './controllers/reddit.controller';
import { handleErrors } from './middlewares/handle-errors.middleware';
import { Routes } from './routes';
import { LoggerStream } from './utils';

/**
 * Implements and configure the Express application
 */
class App {
  /**
   * Express application object
   */
  app: express.Application;
  /**
   * Server routes
   */
  routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
  }

  /**
   * Configures the server using middlewares
   * @private
   */
  private config(): void {
    // body parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // logger
    this.app.use(morgan('combined', { stream: new LoggerStream() }));

    // routes
    this.routes.register(this.app);

    // Cron job to get new posts from reddit
    cron.schedule('* * 8 * * *', async () => {
      try {
        const redditController = new RedditController();
        await redditController.sendTopPostsByEmail();
      } catch (error) {
        console.log(error);
      }
    });

    // log errors
    this.app.use(handleErrors);
  }
}

// exports the express application
export default new App().app;
