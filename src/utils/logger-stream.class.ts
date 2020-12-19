import * as winston from 'winston';

/**
 * Logger options
 */
const options: winston.LoggerOptions = {
  level: 'debug',
  handleExceptions: true,
};

/**
 * Winston logger object creation
 */
const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options),
  ],
  exitOnError: false,
});

export class LoggerStream {
  /**
   * Write the request calls to the console
   * @param message - message coming from Express
   */
  write(message: string) {
    logger.debug(message.substring(0, message.lastIndexOf('\n')));
  }
}
