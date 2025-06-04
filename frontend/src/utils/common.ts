import { isSportsmanRole, Role, Specialization, TrainingRequestStatus } from '@backend/shared/core';

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

export function getBaseRequestText(isPersonal = false): string {
  return `Запрос на\u00A0${(isPersonal) ? 'персональную' : 'совместную'}`;
}

export function addStatusText(text: string, status?: TrainingRequestStatus): string {
  switch (status) {
    case TrainingRequestStatus.Pending:
      return `${text} на\u00A0рассмотрении`;
    case TrainingRequestStatus.Accepted:
      return `${text} принят`;
    case TrainingRequestStatus.Rejected:
      return `${text} отклонён`;
  }

  return '';
}

export function getPersonalTrainingStatusCoachText(status?: TrainingRequestStatus): string {
  const baseText = getBaseRequestText(true);

  switch (status) {
    case TrainingRequestStatus.Pending:
      return baseText;
    case TrainingRequestStatus.Accepted:
      return `Вы приняли ${baseText.toLocaleLowerCase()}`;
    case TrainingRequestStatus.Rejected:
      return `Вы отклонили ${baseText.toLocaleLowerCase()}`;
  }

  return '';
}
