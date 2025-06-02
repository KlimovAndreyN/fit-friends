import { Logger, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path/posix';
import { resolve } from 'node:path';

import { ConfigAlias, Gender, Role } from '@backend/shared/core';
import { FileUploaderRepository } from '@backend/file-storage/file-uploader';
import { RefreshTokenRepository } from '@backend/account/refresh-token';
import { FitUserRepository } from '@backend/account/fit-user';
import { FitQuestionnaireRepository } from '@backend/account/fit-questionnaire';
import { FitFriendRepository } from '@backend/account/fit-friend';
import { TrainingRepository } from '@backend/fit/training';
import { OrderRepository } from '@backend/fit/order';
import { ReviewRepository } from '@backend/fit/review';

import { AppModule } from './app/app.module';
import { clearFiles, seedFiles } from './libs/files';
import { clearRefreshTokens, clearUsers, seedUsers } from './libs/users';
import { clearQuestionnaires, seedQuestionnaires } from './libs/questionnaires';
import { clearFriends, seedFriends } from './libs/friends';
import { clearTrainings, seedTrainings, updateRatingTrainings } from './libs/trainings';
import { clearOrders, seedOrders } from './libs/orders';
import { clearReviews, seedReviews } from './libs/reviews';
import { COACHES, FilesPath, SPORTSMANS } from './libs/mock-data';

async function bootstrap() {
  //! предварительная валидация ENV переменных в getEnvMongooseOptions, process.env[databaseUrlEnv] и process.env[filesUploadDirectoryEnv]
  //    возможно стоит сделать библиотеку с конфигом или проинициализировать ConfigModule указав env-файл
  //      как в конфиг добавить подключение к двум монго там буду разные имена переменных...
  //! очистка подписчиков
  //! регистрация подписок и рассылка при наполении пользователей?

  const app = await NestFactory.create(AppModule);
  const resetBeforeSeedEnv = ConfigAlias.ResetBeforeSeedEnv;
  const resetBeforeSeed = process.env[resetBeforeSeedEnv] === 'true';
  const databaseUrlEnv = ConfigAlias.PostgresDatabaseUrlEnv;
  const filesUploadDirectoryEnv = ConfigAlias.UploadDirectoryEnv;
  const filesUploadDirectory = process.env[filesUploadDirectoryEnv];

  const { ASSETS, AVATARS, CERTIFICATES, VIDEOS, SEED_STATIC } = FilesPath;
  const filesDirectory = resolve(__dirname, '../../..', filesUploadDirectory, SEED_STATIC);
  const filesDistDirectory = resolve(__dirname, '../..', filesUploadDirectory, SEED_STATIC);
  const dbPath = join(filesUploadDirectory, SEED_STATIC)

  Logger.log('Seed runing...');
  Logger.log(`Reset before seed (${resetBeforeSeedEnv}): ${resetBeforeSeed}`);
  Logger.log(`Fit postgres url (${databaseUrlEnv}): ${process.env[databaseUrlEnv]}`);
  Logger.log(`Files upload directory (${filesUploadDirectoryEnv}): ${filesUploadDirectory}`);
  Logger.log(`Files directory: ${filesDirectory}`);
  Logger.log(`Files dist directory: ${filesDistDirectory}`);

  const fileUploaderRepository = app.get(FileUploaderRepository);
  const refreshTokenRepository = app.get(RefreshTokenRepository);
  const fitUserRepository = app.get(FitUserRepository);
  const fitQuestionnaireRepository = app.get(FitQuestionnaireRepository);
  const fitFriendRepository = app.get(FitFriendRepository);
  const trainingRepository = app.get(TrainingRepository);
  const orderRepository = app.get(OrderRepository);
  const reviewRepository = app.get(ReviewRepository);

  try {
    if (resetBeforeSeed) {
      await clearFiles(fileUploaderRepository, filesDirectory, filesDistDirectory);
      await clearRefreshTokens(refreshTokenRepository)
      await clearReviews(reviewRepository)
      await clearOrders(orderRepository);
      await clearTrainings(trainingRepository);
      await clearFriends(fitFriendRepository);
      await clearQuestionnaires(fitQuestionnaireRepository);
      await clearUsers(fitUserRepository);
    }

    // аватарки по гендерам
    const femaleAvatarsFilesIds = await seedFiles(fileUploaderRepository, resolve(__dirname, ASSETS, AVATARS, Gender.Female), filesDirectory, filesDistDirectory, dbPath);
    const maleAvatarsFilesIds = await seedFiles(fileUploaderRepository, resolve(__dirname, ASSETS, AVATARS, Gender.Male), filesDirectory, filesDistDirectory, dbPath);
    // сертификаты тренера
    const certificatesFileIds = await seedFiles(fileUploaderRepository, resolve(__dirname, ASSETS, CERTIFICATES), filesDirectory, filesDistDirectory, dbPath);
    // видео для тренировок
    const videosFileIds = await seedFiles(fileUploaderRepository, resolve(__dirname, ASSETS, VIDEOS), filesDirectory, filesDistDirectory, dbPath);

    // пользователи
    const sportsmans = await seedUsers(fitUserRepository, SPORTSMANS, Role.Sportsman, femaleAvatarsFilesIds, maleAvatarsFilesIds);

    Logger.log(`Sportsmans count: ${sportsmans.length}`);

    const coaches = await seedUsers(fitUserRepository, COACHES, Role.Coach, femaleAvatarsFilesIds, maleAvatarsFilesIds);

    Logger.log(`Coaches count: ${coaches.length}`);

    Logger.log('🤘️ Database Account(mongoDb) was filled!');

    // опросники
    const questionnaires = await seedQuestionnaires(fitQuestionnaireRepository, [...sportsmans, ...coaches], certificatesFileIds);

    Logger.log(`Questionnaires count: ${questionnaires.length}`);

    // друзья
    const friends = await seedFriends(fitFriendRepository, sportsmans, coaches);

    Logger.log(`Friends count: ${friends.length}`);

    // тренировки
    const trainings = await seedTrainings(trainingRepository, coaches, videosFileIds);

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
