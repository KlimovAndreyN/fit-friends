import { Logger } from '@nestjs/common';

import { BackgroundPaths, Duration, Gender, getNewPrice, Specialization, Training, TrainingApiProperty, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomDate, getRandomEnumItem, getRandomItem, getRandomNumber } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity, TrainingRepository } from '@backend/fit/training';
import { ReviewRepository } from '@backend/fit/review';

import { SWAGGER_COACH, ReviewOption, TrainingOption } from './mock-data';

export async function clearTrainings(trainingRepository: TrainingRepository): Promise<void> {
  await trainingRepository.client.training.deleteMany();
}

export async function seedTrainings(
  trainingRepository: TrainingRepository,
  coaches: FitUserEntity[],
  videosFileIds: string[]
): Promise<TrainingEntity[]> {
  const trainings: TrainingEntity[] = [];
  const { MIN_COUNT, MAX_COUNT, NOT_ZERO_PRICE_FACTOR, MIN_PRICE, MAX_PRICE, PRICE_FACTOR, MIN_CALORIES, MAX_CALORIES, CALORIES_FACTOR, MIN_DATE, MAX_DATE } = TrainingOption;
  const { MIN_RATING } = ReviewOption;
  const backgroundPaths = [...BackgroundPaths.TRAININGS];
  let trainingGlobalIndex = 1;

  for (const { id: userId, name: userName } of coaches) {
    const trainingsCount = getRandomNumber(MIN_COUNT, MAX_COUNT);

    for (let trainingIndex = 1; trainingIndex <= trainingsCount; trainingIndex++) {
      const trainingIndexPrefix = `#${trainingGlobalIndex}-${trainingIndex}`;
      const isZeroPrice = getRandomItem([true, ...Array(NOT_ZERO_PRICE_FACTOR).fill(false)]); // добавлю немного бесплатных

      //! потом можно создавать через DTO и сервис, указав id-пользователя и не указывая не нужные поля - rating
      const price = (isZeroPrice) ? 0 : getRandomNumber(MIN_PRICE, MAX_PRICE) * PRICE_FACTOR;
      const isSpecial = (price > 0) && getRandomBoolean();
      const training: Training = {
        title: `Training title ${trainingIndexPrefix}`,
        backgroundPath: getRandomItem(backgroundPaths),
        trainingLevel: getRandomEnumItem(TrainingLevel),
        specialization: getRandomEnumItem(Specialization), //! скорректировать только своих специализаций! coach.specializations! что в ТЗ?
        duration: getRandomEnumItem(Duration),
        price: (isSpecial) ? getNewPrice(price) : price,
        caloriesWaste: getRandomNumber(MIN_CALORIES, MAX_CALORIES) * CALORIES_FACTOR,
        description: `Training description ${trainingIndexPrefix}`,
        gender: getRandomEnumItem(Gender),
        videoFileId: getRandomItem(videosFileIds),
        userId,
        rating: MIN_RATING,
        isSpecial,
        createdAt: getRandomDate(MIN_DATE, MAX_DATE)
      }

      // для удобства тестирования запросов из свагера
      if ((userName === SWAGGER_COACH) && (trainingGlobalIndex === 1) && (trainingIndex === 1)) {
        training.id = TrainingApiProperty.Id.example;
      }

      const trainingEntity = new TrainingEntity(training);

      await trainingRepository.save(trainingEntity);
      trainings.push(trainingEntity);

      Logger.log(`Added training: ${trainingEntity.id} for coachId: ${userId}`);
    }

    trainingGlobalIndex++;
  }

  return trainings;
}

export async function updateRatingTrainings(
  trainingRepository: TrainingRepository,
  reviewRepository: ReviewRepository,
  trainings: TrainingEntity[]
): Promise<void> {
  for (const { id: trainingId } of trainings) {
    //! потом можно запустить через сервис
    const existTraining = await trainingRepository.findById(trainingId);

    if (existTraining) {
      existTraining.rating = await reviewRepository.getAverageTrainingRating(trainingId);
      await trainingRepository.update(existTraining);
      Logger.log(`Update rating trainingId: ${trainingId} / rating: ${existTraining.rating}`);
    }
  }
}
