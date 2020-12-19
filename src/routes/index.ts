import { Application, Request, Response } from 'express';
import userRouter from './user.router';

export class Routes {
  register(app: Application): void {
    app.use('/users', userRouter);

    app.use('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: `Reddit Notifier API version responded successfully`,
      });
    });
  }
}
