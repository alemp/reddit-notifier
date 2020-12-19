import { NextFunction, Request, Response } from 'express';

/**
 * Extends Error class to add statusCode
 */
export class HandleError extends Error {
  /**
   * HTTP status code
   */
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Central error handling
 * @param error - error object
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export const handleErrors = (error: HandleError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HandleError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message
  });
};
