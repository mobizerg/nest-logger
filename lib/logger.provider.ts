import { FactoryProvider } from '@nestjs/common/interfaces';
import { LOGGER_MODULE_OPTIONS } from './logger.constant';
import { LoggerModuleOptions } from './interfaces';
import { getToken } from './logger.helper';
import { LoggerService } from './logger.service';

export const createLogger: (name?: string) => FactoryProvider = (name?: string) => ({
  provide: getToken(name),
  useFactory: (options: LoggerModuleOptions) => {
    return new LoggerService(options.loggerOptions, options.loggerFormat);
  },
  inject: [LOGGER_MODULE_OPTIONS],
});
