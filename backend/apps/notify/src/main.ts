import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GlobalRoute } from '@backend/shared/core';
import { notifyConfig, NotifyConfig } from '@backend/notify/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const notifyOption = app.get<NotifyConfig>(notifyConfig.KEY);
  const { port } = notifyOption;

  app.setGlobalPrefix(GlobalRoute.Global);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GlobalRoute.Global}`);
}

bootstrap();
