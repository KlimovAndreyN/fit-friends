import { Logger } from '@nestjs/common';

import { Duration, Questionnaire, Specialization, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomEnumItem, getRandomNumber, getRandomUniqueItems, enumToArray } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { QuestionnaireEntity, QuestionnaireRepository } from '@backend/fit/questionnaire';

import { MockCalorieOption, MockSpecializationsOption } from './mock-data';

export async function generateQuestionnaires(
  questionnaireRepository: QuestionnaireRepository,
  sportsmans: FitUserEntity[],
  resetBeforeSeed: boolean
): Promise<QuestionnaireEntity[]> {
  const questionnaires: QuestionnaireEntity[] = [];
  const { MIN_COUNT, MAX_COUNT } = MockSpecializationsOption;
  const { LOSE_MIN, LOSE_MAX, WASTE_MIN, WASTE_MAX } = MockCalorieOption;

  if (resetBeforeSeed) {
    await questionnaireRepository.client.questionnaire.deleteMany();
  }

  for (const { id: userId } of sportsmans) {
    const questionnaire: Questionnaire = {
      userId,
      specializations: getRandomUniqueItems(enumToArray(Specialization), getRandomNumber(MIN_COUNT, MAX_COUNT)),
      trainingLevel: getRandomEnumItem(TrainingLevel),
      readyForTraining: getRandomBoolean(),
      duration: getRandomEnumItem(Duration),
      caloriesLose: getRandomNumber(LOSE_MIN, LOSE_MAX),
      caloriesWaste: getRandomNumber(WASTE_MIN, WASTE_MAX)
    }
    const questionnaireEntity = new QuestionnaireEntity(questionnaire);

    await questionnaireRepository.save(questionnaireEntity);
    questionnaires.push(questionnaireEntity);

    Logger.log(`Added questionnaire for sportsmanId : ${userId}`);
  }

  return questionnaires;
}
