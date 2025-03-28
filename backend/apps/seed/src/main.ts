import { Logger, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FitUserRepository } from '@backend/account/fit-user';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log('Seed runing...');

  const fitUserRepository = app.get(FitUserRepository);

  const testUser = await fitUserRepository.findByEmail('aaa@aaa.aaa');

  console.log('testUser', testUser); // вариант вывода №1
  Logger.log(JSON.stringify(testUser.toPOJO(), null, 2), 'SEED'); // вариант вывода №1

  await app.close();
}

bootstrap();
