import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { LoggerModuleAsyncOptions, LoggerModuleOptions, LoggerOptionsFactory } from './interfaces';
import { LOGGER_MODULE_OPTIONS } from './logger.constant';
import { Logger } from './logger.service';

@Global()
@Module({})
export class LoggerCoreModule {

  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerCoreModule,
      providers: [
        { provide: LOGGER_MODULE_OPTIONS, useValue: options },
        Logger,
      ],
      exports: [Logger],
    };
  }

  static registerAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerCoreModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        Logger,
      ],
      exports: [Logger],
    };
  }

  private static createAsyncProviders(options: LoggerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  private static createAsyncOptionsProvider(options: LoggerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: LOGGER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: LOGGER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: LoggerOptionsFactory) => await optionsFactory.createLoggerOptions(options.name),
      inject: [options.useExisting || options.useClass],
    };
  }
}
