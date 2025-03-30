import { AppRoute } from '../const';

export function joinUrl(...items: string[]): string {
  return [...items].join('/');
}

export function getBearerAuthorization(token: string): string {
  return `Bearer ${token}`;
}

export function getViteEnvVariable(envName: keyof ImportMetaEnv, defaultValue = '', showError = true): string {
  // при сборке записывает значения из .env в общий скрипт
  const value = import.meta.env[envName] as string | undefined;

  if (value === undefined) {
    const errorMessage = `Vite environment variable ${envName} is not defined!`;

    if (showError) {
      document.body.innerHTML = `<p style="color: red;">${errorMessage}</p>`;

      throw new Error(errorMessage);
    }
  }

  return value || defaultValue;
}

export function getViteEnvBooleanVariable(envName: keyof ImportMetaEnv, showError = false): boolean {
  const value = getViteEnvVariable(envName, 'false', showError);

  return value === 'true';
}

export function getTrainingLink(trainingId: string): string {
  return AppRoute.Training.replace(':id', trainingId);
}

export function getTrainingReviewsLink(trainingId: string): string {
  return AppRoute.TrainingReviews.replace(':id', trainingId);
}
