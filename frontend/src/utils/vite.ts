/// <reference types="vite/client" />

export function getViteEnvVariable(envName: string, defaultValue = '', showError = true): string {
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

export function getViteEnvBooleanVariable(envName: string, showError = false): boolean {
  const value = getViteEnvVariable(envName, 'false', showError);

  return value === 'true';
}
