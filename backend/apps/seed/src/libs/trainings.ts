import { Logger } from '@nestjs/common';

import { Duration, Gender, Specialization, Training, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomEnumItem, getRandomNumber } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity, TrainingRepository } from '@backend/fit/training';

export async function clearTrainings(trainingRepository: TrainingRepository): Promise<void> {
  await trainingRepository.client.training.deleteMany();
}

export async function seedCoachesTrainings(trainingRepository: TrainingRepository, coaches: FitUserEntity[]): Promise<TrainingEntity[]> {
  const trainings: TrainingEntity[] = [];
  let trainingIndex = 1;

  for (const { id: userId } of coaches) {
    //! нужно количество треноровок на тренера, тоже случайное
    const training: Training = {
      title: `Training title #${trainingIndex}`,
      backgroundPath: 'backgroundPath', //! подставить из разметки
      trainingLevel: getRandomEnumItem(TrainingLevel),
      specialization: getRandomEnumItem(Specialization),
      duration: getRandomEnumItem(Duration),
      price: getRandomNumber(1, 1000), //! условия из ТЗ
      caloriesWaste: getRandomNumber(1, 1000), //! условия из ТЗ
      description: `Training description #${trainingIndex}`,
      gender: getRandomEnumItem(Gender),
      videoFileId: '1111-2222-3333-4444', //! как бы видео сложить на file-storage....
      userId,
      isSpecial: getRandomBoolean()
    }
    const trainingEntity = new TrainingEntity(training);

    await trainingRepository.save(trainingEntity);
    trainings.push(trainingEntity);

    Logger.log(`Added training for coachId : ${userId}`);
    Logger.log(trainingEntity);

    trainingIndex++;
  }

  return trainings;
}
