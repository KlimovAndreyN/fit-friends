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
import { clearQuestionnaires, seedQuestionnaires } from './libs/questionnaires';
import { clearTrainings, seedTrainings, updateRatingTrainings } from './libs/trainings';
import { COACHES, SPORTSMANS } from './libs/mock-data';
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
      await clearReviews(reviewRepository)
      await clearOrders(orderRepository);
      await clearTrainings(trainingRepository);
      await clearQuestionnaires(questionnaireRepository);
      await clearUsers(fitUserRepository);
    }

    // пользователи
    const sportsmans = await seedUsers(fitUserRepository, SPORTSMANS, Role.Sportsman);

    Logger.log(`Sportsmans count: ${sportsmans.length}`);

    const coaches = await seedUsers(fitUserRepository, COACHES, Role.Coach);

    Logger.log(`Coaches count: ${coaches.length}`);

    Logger.log('🤘️ Database Account(mongoDb) was filled!');

    // опросники
    const questionnaires = await seedQuestionnaires(questionnaireRepository, [...sportsmans, ...coaches]);

    Logger.log(`Questionnaires count: ${questionnaires.length}`);

    // тренировки
    const trainings = await seedTrainings(trainingRepository, coaches);

    Logger.log(`Trainings count: ${trainings.length}`);

    // заказы
    const orders = await seedOrders(orderRepository, trainings, sportsmans);

    Logger.log(`Orders count: ${orders.length}`);

    // отзывы
    const reviews = await seedReviews(reviewRepository, orders);

    Logger.log(`Reviews count: ${reviews.length}`);

    // пересчет среднего рейтинга тренировок
    await updateRatingTrainings(trainingRepository, reviewRepository, trainings);

    Logger.log('🤘️ Database Fit(postgres) was filled!');

    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
  } finally {
    globalThis.process.exit(1);
  }
}

bootstrap();
