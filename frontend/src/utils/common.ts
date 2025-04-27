import { AppRoute, ID_PARAM, MAIN_TITLE } from '../const';

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
