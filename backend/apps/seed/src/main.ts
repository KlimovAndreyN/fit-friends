import { Logger, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigAlias, Role } from '@backend/shared/core';
import { FitUserRepository } from '@backend/account/fit-user';
import { QuestionnaireRepository } from '@backend/fit/questionnaire';

import { AppModule } from './app/app.module';
import { clearUsers, seedUsers } from './libs/users';
import { clearQuestionnaires, seedSportsmansQuestionnaires } from './libs/questionnaires';
import { MOCK_COACHES, MOCK_SPORTSMANS } from './libs/mock-data';

async function bootstrap() {
  //! возможно стоит сделать библиотеку с конфигом или проинициализировать ConfigModule указав env-файл
  const app = await NestFactory.create(AppModule);
  const resetBeforeSeed = process.env[ConfigAlias.ResetBeforeSeedEnv] === 'true';
  const databaseUrlEnv = ConfigAlias.PostgresDatabaseUrlEnv;

  Logger.log('Seed runing...');
  Logger.log(`Reset before seed is ${resetBeforeSeed}`);
  Logger.log(`Fit postgres url (${databaseUrlEnv}): ${process.env[databaseUrlEnv]}`);

  const fitUserRepository = app.get(FitUserRepository);
  const questionnaireRepository = app.get(QuestionnaireRepository);

  try {
    if (resetBeforeSeed) {
      clearQuestionnaires(questionnaireRepository);
      clearUsers(fitUserRepository);
    }

    const sportsmans = await seedUsers(fitUserRepository, MOCK_SPORTSMANS, Role.Sportsman);

    Logger.log(`Sportsmans count: ${sportsmans.length}`);

    const coaches = await seedUsers(fitUserRepository, MOCK_COACHES, Role.Coach);

    Logger.log(`Coaches count: ${coaches.length}`);

    Logger.log('🤘️ Database Account(mongoDb) was filled!');

    const sportsmansQuestionnaires = await seedSportsmansQuestionnaires(app.get(QuestionnaireRepository), sportsmans);

    Logger.log(`Questionnaires sportsmans count: ${sportsmansQuestionnaires.length}`);

    //! нужно еще опросники тренеров
    //const coachesQuestionnaires = await seedCoachesQuestionnaires(app.get(QuestionnaireRepository), coaches);

    //Logger.log(`Questionnaires coaches count: ${coachesQuestionnaires.length}`);

    Logger.log('🤘️ Database Fit(postgres) was filled!');

    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
  } finally {
    globalThis.process.exit(1);
  }
}

bootstrap();
