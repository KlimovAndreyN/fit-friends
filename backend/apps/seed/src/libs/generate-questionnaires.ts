import { Logger } from '@nestjs/common';

import { Duration, Questionnaire, Specialization, UserLevel } from '@backend/shared/core';
import { QuestionnaireEntity, QuestionnaireRepository } from '@backend/fit/questionnaire';

import { getRandomBoolean, getRandomItem, getRandomNumber } from './random';
import { FitUserEntity } from '@backend/account/fit-user';

export async function generateQuestionnaires(
  questionnaireRepository: QuestionnaireRepository,
  sportsmans: FitUserEntity[],
  resetBeforeSeed: boolean
): Promise<QuestionnaireEntity[]> {
  const questionnaires: QuestionnaireEntity[] = [];

  if (resetBeforeSeed) {
    await questionnaireRepository.client.questionnaire.deleteMany();
  }

  for (const { id: userId } of sportsmans) {
    const questionnaire: Questionnaire = {
      userId,
      specializations: [Specialization.Aerobics, Specialization.Crossfit], //!
      level: getRandomItem(Object.values(UserLevel)),
      readyForTraining: getRandomBoolean(),
      time: getRandomItem(Object.values(Duration)),
      caloriesLose: getRandomNumber(3000, 5000),
      caloriesWaste: getRandomNumber(1000, 2000)
    }

    const questionnaireEntity = new QuestionnaireEntity(questionnaire);
    await questionnaireRepository.save(questionnaireEntity);
    questionnaires.push(questionnaireEntity);

    Logger.log(`Added questionnaire for sportsmanId : ${userId}`);
  }

  return questionnaires;
}
