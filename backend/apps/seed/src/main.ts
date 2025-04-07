import { Logger, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigAlias, Role } from '@backend/shared/core';
import { FitUserRepository } from '@backend/account/fit-user';
import { QuestionnaireRepository } from '@backend/fit/questionnaire';
import { TrainingRepository } from '@backend/fit/training';
import { OrderRepository } from '@backend/fit/order';
import { ReviewRepository } from '@backend/fit/review';

import { AppModule } from './app/app.module';
import { clearUsers, seedUsers } from './libs/users';
import { clearQuestionnaires, seedSportsmansQuestionnaires } from './libs/questionnaires';
import { clearTrainings, seedTrainings } from './libs/trainings';
import { MOCK_COACHES, MOCK_SPORTSMANS } from './libs/mock-data';
import { clearOrders, seedOrders } from './libs/orders';
import { clearReviews, seedReviews } from './libs/reviews';

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
  const trainingRepository = app.get(TrainingRepository);
  const orderRepository = app.get(OrderRepository);
  const reviewRepository = app.get(ReviewRepository);

  try {
    if (resetBeforeSeed) {
      clearReviews(reviewRepository)
      clearOrders(orderRepository);
      clearTrainings(trainingRepository);
      clearQuestionnaires(questionnaireRepository);
      clearUsers(fitUserRepository);
    }

    // пользователи
    const sportsmans = await seedUsers(fitUserRepository, MOCK_SPORTSMANS, Role.Sportsman);

    Logger.log(`Sportsmans count: ${sportsmans.length}`);

    const coaches = await seedUsers(fitUserRepository, MOCK_COACHES, Role.Coach);

    Logger.log(`Coaches count: ${coaches.length}`);

    Logger.log('🤘️ Database Account(mongoDb) was filled!');

    // опросники
    const sportsmansQuestionnaires = await seedSportsmansQuestionnaires(questionnaireRepository, sportsmans);

    Logger.log(`Questionnaires sportsmans count: ${sportsmansQuestionnaires.length}`);

    //! нужно еще опросники тренеров
    //const coachesQuestionnaires = await seedCoachesQuestionnaires(questionnaireRepository, coaches);

    //Logger.log(`Questionnaires coaches count: ${coachesQuestionnaires.length}`);

    // тренировки
    const trainings = await seedTrainings(trainingRepository, coaches);

    Logger.log(`Trainings count: ${trainings.length}`);

    // заказы
    const orders = await seedOrders(orderRepository, trainings, sportsmans);

    Logger.log(`Orders count: ${orders.length}`);

    // отзывы
    const reviews = await seedReviews(reviewRepository, orders);

    Logger.log(`Reviews count: ${reviews.length}`);

    //! запустить пересчет среднего рейтинга тренировки

    Logger.log('🤘️ Database Fit(postgres) was filled!');

    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
  } finally {
    globalThis.process.exit(1);
  }
}

bootstrap();
