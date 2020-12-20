import { Application, Request, Response } from 'express';
import channelRouter from './channel.router';
import userRouter from './user.router';

/**
 * Implement routes
 */
export class Routes {
  /**
   * register routes
   * @param app - Express application
   */
  register(app: Application): void {
    app.use('/channels', channelRouter);
    app.use('/users', userRouter);

    app.use('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: `Reddit Notifier API version responded successfully`,
      });
    });
  }
}
