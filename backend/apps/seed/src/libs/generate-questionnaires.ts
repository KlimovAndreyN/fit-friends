import { Logger } from '@nestjs/common';

import { Duration, Questionnaire, Specialization, TrainingLevel } from '@backend/shared/core';
import { FitUserEntity } from '@backend/account/fit-user';
import { QuestionnaireEntity, QuestionnaireRepository } from '@backend/fit/questionnaire';

import { getRandomBoolean, getRandomEnumItem, getRandomNumber, getRandomUniqueItems } from './random';
import { enumToArray } from './utils';

import { MOCK_CALORIES, MOCK_SPECIALIZATIONS } from './mock-data';

export async function generateQuestionnaires(
  questionnaireRepository: QuestionnaireRepository,
  sportsmans: FitUserEntity[],
  resetBeforeSeed: boolean
): Promise<QuestionnaireEntity[]> {
  const questionnaires: QuestionnaireEntity[] = [];
  const { minCount, maxCount } = MOCK_SPECIALIZATIONS;
  const { loseMin, loseMax, wasteMin, wasteMax } = MOCK_CALORIES;

  if (resetBeforeSeed) {
    await questionnaireRepository.client.questionnaire.deleteMany();
  }

  for (const { id: userId } of sportsmans) {
    const questionnaire: Questionnaire = {
      userId,
      specializations: getRandomUniqueItems(enumToArray(Specialization), getRandomNumber(minCount, maxCount)),
      trainingLevel: getRandomEnumItem(TrainingLevel),
      readyForTraining: getRandomBoolean(),
      time: getRandomEnumItem(Duration),
      caloriesLose: getRandomNumber(loseMin, loseMax),
      caloriesWaste: getRandomNumber(wasteMin, wasteMax)
    }
    const questionnaireEntity = new QuestionnaireEntity(questionnaire);

    await questionnaireRepository.save(questionnaireEntity);
    questionnaires.push(questionnaireEntity);

    Logger.log(`Added questionnaire for sportsmanId : ${userId}`);
  }

  return questionnaires;
}
