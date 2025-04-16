import { Logger } from '@nestjs/common';

import { Duration, Gender, Specialization, Training, TrainingApiProperty, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomDate, getRandomEnumItem, getRandomItem, getRandomNumber } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity, TrainingRepository } from '@backend/fit/training';

import { MOCK_SWAGGER_COACH, MOCK_TRAININGS_BACKGROUND_PATHS, MockReviewOption, MockTrainingOption } from './mock-data';

export async function clearTrainings(trainingRepository: TrainingRepository): Promise<void> {
  await trainingRepository.client.training.deleteMany();
}

export async function seedTrainings(trainingRepository: TrainingRepository, coaches: FitUserEntity[]): Promise<TrainingEntity[]> {
  const trainings: TrainingEntity[] = [];
  const { MIN_COUNT, MAX_COUNT, NOT_ZERO_PRICE_FACTOR, MIN_PRICE, MAX_PRICE, PRICE_FACTOR, MIN_CALORIES, MAX_CALORIES, CALORIES_FACTOR, MIN_DATE, MAX_DATE } = MockTrainingOption;
  const { MIN_RATING, MAX_RATING } = MockReviewOption;
  let trainingGlobalIndex = 1;

  for (const { id: userId, name: userName } of coaches) {
    const trainingsCount = getRandomNumber(MIN_COUNT, MAX_COUNT);

    for (let trainingIndex = 1; trainingIndex <= trainingsCount; trainingIndex++) {
      const trainingIndexPrefix = `#${trainingGlobalIndex}-${trainingIndex}`;
      const isZeroPrice = getRandomItem([true, ...Array(NOT_ZERO_PRICE_FACTOR).fill(false)]); // добавлю немного бесплатных

      //! потом можно создавать через DTO и сервис, указав id-пользователя и не указывая не нужные поля - rating
      const training: Training = {
        title: `Training title ${trainingIndexPrefix}`,
        backgroundPath: getRandomItem(MOCK_TRAININGS_BACKGROUND_PATHS),
        trainingLevel: getRandomEnumItem(TrainingLevel),
        specialization: getRandomEnumItem(Specialization), //! скорректировать только своих специализаций! coach.specializations! что в ТЗ?
        duration: getRandomEnumItem(Duration),
        price: (isZeroPrice) ? 0 : getRandomNumber(MIN_PRICE, MAX_PRICE) * PRICE_FACTOR,
        caloriesWaste: getRandomNumber(MIN_CALORIES, MAX_CALORIES) * CALORIES_FACTOR,
        description: `Training description ${trainingIndexPrefix}`,
        gender: getRandomEnumItem(Gender),
        videoFileId: '1111-2222-3333-4444', //! как бы видео загрузить на file-storage....
        userId,
        rating: getRandomNumber(MIN_RATING, MAX_RATING), //! временно, пока нет сервиса для пересчета рейтинга...
        //! возможно так и отсавить... следующая добавленная оценка расчитает корректный рейтинг
        //! или сформировать отзывы и актуализировать райтинг
        isSpecial: getRandomBoolean(),
        createdAt: getRandomDate(MIN_DATE, MAX_DATE)
      }

      // для удобства тестирования запросов из свагера
      if ((userName === MOCK_SWAGGER_COACH) && (trainingGlobalIndex === 1) && (trainingIndex === 1)) {
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

export async function updateRatingTrainings(trainingRepository: TrainingRepository, trainings: TrainingEntity[]): Promise<void> {
  for (const { id: trainingId } of trainings) {
    //! потом можно запустить через сервис
    const existTraining = await trainingRepository.findById(trainingId);

    existTraining.rating = 3;//! доделать пересчет среднего рейтинга тренировки через репозитарий/сервис отзывов
    await trainingRepository.update(existTraining);
    Logger.log(`Update rating trainingId: ${trainingId} / rating: ${existTraining.rating}`);
  }
}
