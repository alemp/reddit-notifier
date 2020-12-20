import { Application, Request, Response } from 'express';
import { RedditController } from '../controllers/reddit.controller';
import channelRouter from './channel.router';
import userRouter from './user.router';

export class Routes {
  register(app: Application): void {
    app.use('/channels', channelRouter);
    app.use('/users', userRouter);

    app.use('/authenticate', async (req: Request, res: Response) => {
      const controller = new RedditController();

      const response = await controller.authenticate();

      res.status(200).json(response);
    });

    app.use('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: `Reddit Notifier API version responded successfully`,
      });
    });
  }
}
