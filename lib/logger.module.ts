import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './interfaces';
import { LoggerCoreModule } from './logger-core.module';

@Module({})
export class LoggerModule {

  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: [LoggerCoreModule.register(options)],
    };
  }

  static registerAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: [LoggerCoreModule.registerAsync(options)],
    };
  }
}
