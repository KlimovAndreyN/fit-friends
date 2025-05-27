import { Logger } from '@nestjs/common';

import { Duration, isSportsmanRole, Questionnaire, Specialization, TrainingLevel } from '@backend/shared/core';
import { getRandomBoolean, getRandomEnumItem, getRandomNumber, getRandomUniqueItems, convertEnumToArray } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { FitQuestionnaireEntity, FitQuestionnaireRepository } from '@backend/account/fit-questionnaire';

import { isSwaggers } from './common';
import { CalorieOption, SpecializationsOption } from './mock-data';

export async function clearQuestionnaires(fitQuestionnaireRepository: FitQuestionnaireRepository): Promise<void> {
  fitQuestionnaireRepository.deleteAll();
}

export async function seedQuestionnaires(
  fitQuestionnaireRepository: FitQuestionnaireRepository,
  users: FitUserEntity[],
  certificatesFileIds: string[]
): Promise<FitQuestionnaireEntity[]> {
  const questionnaires: FitQuestionnaireEntity[] = [];
  const { MIN_COUNT, MAX_COUNT } = SpecializationsOption;
  const { LOSE_MIN, LOSE_MAX, WASTE_MIN, WASTE_MAX } = CalorieOption;

  for (const { id: userId, role, name } of users) {
    //! попробовать добавлять через сервис QuestionnaireService

    // для удобства проверки главной страницы и каталога пользователей, сортировка по дате
    const isSwaggerUser = isSwaggers(name);
    // для удобства проверки главной страницы, сортировка по дате
    const readyForTraining = isSwaggerUser || getRandomBoolean() || getRandomBoolean(); // удвоим
    // для удобства проверки каталога пользователей, сортировка по дате
    const trainingLevel = (isSwaggerUser) ? TrainingLevel.Amateur : getRandomEnumItem(TrainingLevel);
    const questionnaire: Questionnaire = {
      userId,
      specializations: getRandomUniqueItems(convertEnumToArray(Specialization), getRandomNumber(MIN_COUNT, MAX_COUNT)),
      trainingLevel,
      readyForTraining
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

    const questionnaireEntity = new FitQuestionnaireEntity(questionnaire);

    await fitQuestionnaireRepository.save(questionnaireEntity);
    questionnaires.push(questionnaireEntity);

    Logger.log(`Added ${role} questionnaire for userId : ${userId}`);
  }

  return questionnaires;
}
