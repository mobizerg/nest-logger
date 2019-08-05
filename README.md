<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
A Morgan + Winston custom logger integration module for Nest.js framework.
</p>

### Installation

**Yarn**
```bash
yarn add @mobizerg/nest-logger morgan winston
yarn add @types/morgan --dev
```

**NPM**
```bash
npm install @mobizerg/nest-logger morgan winston --save
npm install @types/morgan --save-dev
```

### Description
Custom logger module for [Nest.js](https://github.com/nestjs/nest) based on [Morgan](https://github.com/expressjs/morgan) & [Winston](https://github.com/winstonjs/winston) package.

### Usage

Import the **LoggerModule** in `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { LoggerModule } from '@mobizerg/nest-logger';

@Module({
    imports: [
        LoggerModule.register(options),
    ],
})
export class AppModule {}
```
With Async
```typescript
import { Module } from '@nestjs/common';
import { LoggerModule } from '@mobizerg/nest-logger';

@Module({
    imports: [
        LoggerModule.registerAsync({
            imports: [ConfigModule],
            useExisting: LoggerConfigService,
        }),
    ],
})
export class AppModule {}
```

Example config file (async)
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerModuleOptions, LoggerOptionsFactory } from '@mobizerg/nest-logger';
import { transports, format } from 'winston';

@Injectable()
export class LoggerConfigService implements LoggerOptionsFactory {

  constructor(private readonly config: ConfigService) {}

  createLoggerOptions(name?: string): LoggerModuleOptions {
    
    return {
      name,
      // Winston logger options
      loggerOptions: {
        level: 'error',
        format: format.cli(),
        transports: [new transports.Console()]
      },
      // Morgan logger format
      loggerFormat: ':method :status :url :response-time ms - :remote-addr :user-agent HTTP/:http-version :res[content-length]'
    };
  }
}
```

Add **LoggerModule** in `main.ts`
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@mobizerg/nest-logger';

async function bootstrap() {
  
  const server = express();
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = app.get(LoggerService);
 
  app.use(logger.logInfo());
  app.use(logger.logError());
    
  app.useLogger(logger);
}
```

### License

MIT
