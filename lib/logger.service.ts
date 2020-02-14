import { createLogger, format, Logger, transports } from 'winston';
import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces';
import { LOGGER_MODULE_OPTIONS } from './logger.constant';

@Injectable()
export class LoggerService implements NestLoggerService {

  private readonly logger: Logger;

  constructor(@Inject(LOGGER_MODULE_OPTIONS)
              private readonly options: LoggerModuleOptions) {

    if (options && options.loggerOptions) {
      this.logger = createLogger(options.loggerOptions);
    } else {
      this.logger = createLogger({
        level: 'info',
        format: format.simple(),
        transports: [new transports.Console()],
      });
    }
  }

  debug(message: any, context?: string): void {
    this.logger.debug(this.stringify(message), { context });
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(this.stringify(message), { trace, context });
  }

  log(message: any, context?: string): void {
    this.logger.info(this.stringify(message), { context });
  }

  verbose(message: any, context?: string): void {
    this.logger.verbose(this.stringify(message), { context });
  }

  warn(message: any, context?: string): void {
    this.logger.warn(this.stringify(message), { context });
  }

  private stringify(message: any): string {
    return (typeof message === 'string') ? message : JSON.stringify(message, undefined, 2);
  }
}
