import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
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
    this.routes.register(this.app);
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

    // log errors
    this.app.use(handleErrors);
  }
}

// exports the express application
export default new App().app;
