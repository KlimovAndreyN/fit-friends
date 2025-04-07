import { Logger } from '@nestjs/common';

import { Duration, Gender, Specialization, Training, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomEnumItem, getRandomItem, getRandomNumber } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity, TrainingRepository } from '@backend/fit/training';
import { MOCK_TRAININGS_BACKGROUND_PATHS, MockTrainingsOption } from './mock-data';

export async function clearTrainings(trainingRepository: TrainingRepository): Promise<void> {
  await trainingRepository.client.training.deleteMany();
}

export async function seedCoachesTrainings(trainingRepository: TrainingRepository, coaches: FitUserEntity[]): Promise<TrainingEntity[]> {
  const trainings: TrainingEntity[] = [];
  const { MIN_COUNT, MAX_COUNT, MIN_PRICE, MAX_PRICE, MIN_CALORIES, MAX_CALORIES } = MockTrainingsOption;
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
        videoFileId: '1111-2222-3333-4444', //! как бы видео закинуть на file-storage....
        userId,
        rating: 0,
        isSpecial: getRandomBoolean()
      }
      const trainingEntity = new TrainingEntity(training);

      await trainingRepository.save(trainingEntity);
      trainings.push(trainingEntity);

      Logger.log(`Added training for coachId : ${userId}`);
      console.log(trainingEntity);
    }
    trainingGlobalIndex++;
  }

  return trainings;
}
