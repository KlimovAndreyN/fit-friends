import { isSportsmanRole, Role, Specialization } from '@backend/shared/core';

import { AppRoute, ID_PARAM, MAIN_TITLE, SpecializationTitle } from '../const';

export function getPageTitle(title: string): string {
  return (title === MAIN_TITLE) ? MAIN_TITLE : `${title} — ${MAIN_TITLE}`;
}

export function getBearerAuthorization(token: string): string {
  return `Bearer ${token}`;
}

export function getTrainingRoute(trainingId: string): string {
  return AppRoute.TrainingDetail.replace(ID_PARAM, trainingId);
}

export function getUserRoute(userId: string): string {
  return AppRoute.UserDetail.replace(ID_PARAM, userId);
}

export function isEventEscKey(event: KeyboardEvent): boolean {
  return event.key === 'Escape';
}

export function hasPriceMaxPropertyKey(object: object): boolean {
  return Object.hasOwn(object, 'priceMax');
}

export function getReadyTraining(role: Role, readyForTraining = true): string {
  const text = (isSportsmanRole(role)) ? 'Готов к\u00A0тренировке' : 'Готов тренировать';

  return ((readyForTraining) ? text : `Не\u00A0${text.toLowerCase()}`);
}

export function getSpecializationsTitles(specializations: Specialization[]): string[] {
  return specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );
}
