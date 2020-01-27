import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces';
import { LOGGER_MODULE_OPTIONS } from './logger.constant';

@Injectable()
export class Logger implements LoggerService {

  private readonly logger: WinstonLogger;

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

  debug(message: string, context?: string): void {
    this.logger.debug(`[${context || ''}] ${message}`, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(`[${context || ''}] ${message}`, trace, context);
  }

  log(message: string, context?: string): void {
    this.logger.log(`[${context || ''}] ${message}`, context);
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(`[${context || ''}] ${message}`, context);
  }

  warn(message: string, context?: string): void {
    this.logger.warn(`[${context || ''}] ${message}`, context);
  }
}
