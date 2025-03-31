import { Logger, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FitUserRepository } from '@backend/account/fit-user';
import { QuestionnaireRepository } from '@backend/fit/questionnaire';

import { AppModule } from './app/app.module';
import { generateSportsmans } from './libs/generate-sportsmans';
import { generateQuestionnaires } from './libs/generate-questionnaires';

async function bootstrap() {
  //! возможно стоит сделать библиотеку с конфигом или проинициализировать конфиг
  //! при запуске из dist, не подставляет занчения EMV в DATABASE_URL? проверить на других модулях
  const app = await NestFactory.create(AppModule);
  const resetBeforeSeed = process.env['RESET_BEFORE_SEED'] === 'true';

  Logger.log('Seed runing...');
  Logger.log(`Reset before seed is ${resetBeforeSeed}`);
  Logger.log(`Fit postgres url: ${process.env['DATABASE_URL']}`);

  try {
    const sportsmans = await generateSportsmans(app.get(FitUserRepository), resetBeforeSeed);

    Logger.log(`Sportsmans count: ${sportsmans.length}`);
    Logger.log('🤘️ Database Account(mongoDb) was filled!');

    const questionnaires = await generateQuestionnaires(app.get(QuestionnaireRepository), sportsmans, resetBeforeSeed);
    Logger.log(`Questionnaires count: ${questionnaires.length}`);
    Logger.log('🤘️ Database Fit(postgres) was filled!');

    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
  } finally {
    globalThis.process.exit(1);
  }
}

bootstrap();
