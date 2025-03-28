import { Logger, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FitUserRepository } from '@backend/account/fit-user';

import { AppModule } from './app/app.module';
import { generateSportsmans } from './libs/generate-sportsmans';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log('Seed runing...');

  try {
    const sportsmans = await generateSportsmans(app.get(FitUserRepository));

    Logger.log(`Sportsmans count: ${sportsmans.length}`);
    Logger.log('🤘️ Database Account(mongoDb) was filled!');

    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
  } finally {
    globalThis.process.exit(1);
  }
}

bootstrap();
