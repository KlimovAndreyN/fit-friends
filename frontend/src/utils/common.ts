export function getBearerAuthorization(token: string): string {
  return `Bearer ${token}`;
}

export function getViteEnvVariable(envName: keyof ImportMetaEnv, showError = true): string {
  // при сборке записывает значения из .env в общий скрипт
  const value = import.meta.env[envName] as string | undefined;

  if (value === undefined) {
    const errorMessage = `Vite environment variable ${envName} is not defined!`;

    if (showError) {
      document.body.innerHTML = `<p style="color: red;">${errorMessage}</p>`;

      throw new Error(errorMessage);
    }
  }

  return value || '';
}
