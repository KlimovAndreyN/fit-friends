import { Logger } from '@nestjs/common';

import { Duration, Gender, Specialization, Training, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomDate, getRandomEnumItem, getRandomItem, getRandomNumber } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity, TrainingRepository } from '@backend/fit/training';

import { MOCK_TRAININGS_BACKGROUND_PATHS, MockReviewOption, MockTrainingOption } from './mock-data';

export async function clearTrainings(trainingRepository: TrainingRepository): Promise<void> {
  await trainingRepository.client.training.deleteMany();
}

export async function seedTrainings(trainingRepository: TrainingRepository, coaches: FitUserEntity[]): Promise<TrainingEntity[]> {
  const trainings: TrainingEntity[] = [];
  const { MIN_COUNT, MAX_COUNT, MIN_PRICE, MAX_PRICE, MIN_CALORIES, MAX_CALORIES, MIN_DATE, MAX_DATE } = MockTrainingOption;
  const { MIN_RATING, MAX_RATING } = MockReviewOption;
  let trainingGlobalIndex = 1;

  for (const { id: userId } of coaches) {
    const trainingsCount = getRandomNumber(MIN_COUNT, MAX_COUNT);

    for (let trainingIndex = 1; trainingIndex <= trainingsCount; trainingIndex++) {
      const trainingIndexPrefix = `#${trainingGlobalIndex}-${trainingIndex}`;

      //! потом можно создавать через DTO и сервис, указав id-пользователя и не указывая не нужные поля - rating
      const training: Training = {
        title: `Training title ${trainingIndexPrefix}`,
        backgroundPath: getRandomItem(MOCK_TRAININGS_BACKGROUND_PATHS),
        trainingLevel: getRandomEnumItem(TrainingLevel),
        specialization: getRandomEnumItem(Specialization),
        duration: getRandomEnumItem(Duration),
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        caloriesWaste: getRandomNumber(MIN_CALORIES, MAX_CALORIES),
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
