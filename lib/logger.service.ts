import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createLogger, format, Logger, LoggerOptions, transports } from 'winston';
import { Request, RequestHandler, Response } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerService implements NestLoggerService {

  private readonly logger: Logger;
  private readonly format: string;

  constructor(private readonly loggerOptions?: LoggerOptions,
              private readonly loggerFormat?: string) {
    this.format = loggerFormat ? loggerFormat : 'dev';
    this.logger = createLogger(loggerOptions ?
      loggerOptions : {
        level: 'info',
        format: format.simple(),
        transports: [new transports.Console()],
      });
  }

  logInfo(): RequestHandler {
    return morgan(this.format, {
      skip: (req: Request, res: Response) => res.statusCode >= 400,
      stream: process.stdout,
    });
  }

  logError(): RequestHandler {
    return morgan(this.format, {
      skip: (req: Request, res: Response) => res.statusCode < 400,
      stream: process.stderr,
    });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.debug(message, context, trace);
  }

  log(message: string, context?: string): void {
    this.logger.log({ level: 'info', message });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, context);
  }

  warn(message: string, context?: string): void {
    this.logger.verbose(message, context);
  }
}
