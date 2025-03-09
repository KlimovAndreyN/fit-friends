import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PrefixOption } from '@project/shared/core';
import { notifyConfig, NotifyConfig } from '@project/notify/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const notifyOption = app.get<NotifyConfig>(notifyConfig.KEY);
  const { port } = notifyOption;

  app.setGlobalPrefix(PrefixOption.Global);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //! а нужно ли слушать? перепроверить при регистрации
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${PrefixOption.Global}`);
}

bootstrap();
