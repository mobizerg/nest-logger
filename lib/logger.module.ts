import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import { LoggerModuleAsyncOptions, LoggerModuleOptions, LoggerOptionsFactory } from './interfaces';
import { createLogger } from './logger.provider';
import { LOGGER_MODULE_OPTIONS } from './logger.constant';
import { getToken } from './logger.helper';

@Module({})
export class LoggerModule {

  constructor(@Inject(LOGGER_MODULE_OPTIONS)
              private readonly options: LoggerModuleOptions) {}

  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        createLogger(options.name),
        { provide: LOGGER_MODULE_OPTIONS, useValue: options },
      ],
      exports: [getToken(options.name)],
    };
  }

  static registerAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: options.imports || [],
      providers: [
        createLogger(options.name),
        ...this.createAsyncProviders(options),
      ],
      exports: [getToken(options.name)],
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
