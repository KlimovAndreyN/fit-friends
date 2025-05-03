import { Logger } from '@nestjs/common';

import { Duration, isSportsmanRole, Questionnaire, Specialization, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomEnumItem, getRandomNumber, getRandomUniqueItems, convertEnumToArray } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { QuestionnaireEntity, QuestionnaireRepository } from '@backend/fit/questionnaire';

import { CalorieOption, SpecializationsOption } from './mock-data';

export async function clearQuestionnaires(questionnaireRepository: QuestionnaireRepository): Promise<void> {
  await questionnaireRepository.client.questionnaire.deleteMany();
}

export async function seedQuestionnaires(
  questionnaireRepository: QuestionnaireRepository,
  users: FitUserEntity[],
  certificatesFileIds: string[]
): Promise<QuestionnaireEntity[]> {
  const questionnaires: QuestionnaireEntity[] = [];
  const { MIN_COUNT, MAX_COUNT } = SpecializationsOption;
  const { LOSE_MIN, LOSE_MAX, WASTE_MIN, WASTE_MAX } = CalorieOption;

  for (const { id: userId, role, name } of users) {
    //! попробовать добавлять через сервис QuestionnaireService

    const questionnaire: Questionnaire = {
      userId,
      specializations: getRandomUniqueItems(convertEnumToArray(Specialization), getRandomNumber(MIN_COUNT, MAX_COUNT)),
      trainingLevel: getRandomEnumItem(TrainingLevel),
      readyForTraining: getRandomBoolean() || getRandomBoolean() // удвоим
    }

    if (isSportsmanRole(role)) {
      questionnaire.duration = getRandomEnumItem(Duration);
      questionnaire.caloriesLose = getRandomNumber(LOSE_MIN, LOSE_MAX);
      questionnaire.caloriesWaste = getRandomNumber(WASTE_MIN, WASTE_MAX);
    } else {
      questionnaire.individualTraining = getRandomBoolean();
      questionnaire.description = `Description: my name is ${name}`;
      questionnaire.individualTraining = getRandomBoolean() || getRandomBoolean(); // удвоим
      questionnaire.fileIds = getRandomUniqueItems(certificatesFileIds, getRandomNumber(0, certificatesFileIds.length - 1));
    }

    const questionnaireEntity = new QuestionnaireEntity(questionnaire);

    await questionnaireRepository.save(questionnaireEntity);
    questionnaires.push(questionnaireEntity);

    Logger.log(`Added ${role} questionnaire for userId : ${userId}`);
  }

  return questionnaires;
}
