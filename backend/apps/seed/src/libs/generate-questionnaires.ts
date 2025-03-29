import { Logger } from '@nestjs/common';

import { Duration, Questionnaire, Specialization, UserLevel } from '@backend/shared/core';
import { FitUserEntity } from '@backend/account/fit-user';
import { QuestionnaireEntity, QuestionnaireRepository } from '@backend/fit/questionnaire';

import { getRandomBoolean, getRandomEnumItem, getRandomNumber } from './random';

import { MOCK_CALORIES } from './mock-data';

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
      level: getRandomEnumItem(UserLevel),
      readyForTraining: getRandomBoolean(),
      time: getRandomEnumItem(Duration),
      caloriesLose: getRandomNumber(MOCK_CALORIES.loseMin, MOCK_CALORIES.loseMax),
      caloriesWaste: getRandomNumber(MOCK_CALORIES.wasteMin, MOCK_CALORIES.wasteMax)
    }
    const questionnaireEntity = new QuestionnaireEntity(questionnaire);

    await questionnaireRepository.save(questionnaireEntity);
    questionnaires.push(questionnaireEntity);

    Logger.log(`Added questionnaire for sportsmanId : ${userId}`);
  }

  return questionnaires;
}
