import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { LoggerOptions } from 'winston';

export interface LoggerModuleOptions {
  name?: string;
  loggerOptions?: LoggerOptions;
  loggerFormat?: string;
}

export interface LoggerOptionsFactory {
  createLoggerOptions(name?: string): Promise<LoggerModuleOptions> | LoggerModuleOptions;
}

export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<LoggerOptionsFactory>;
  useClass?: Type<LoggerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
  inject?: any[];
}
