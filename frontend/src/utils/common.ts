export function getBearerAuthorization(token: string): string {
  return `Bearer ${token}`;
}

export function getViteEnvVariable(envName: keyof ImportMetaEnv): string {
  const value = import.meta.env[envName] as string | undefined;

  if (value === undefined) {
    // eslint-disable-next-line
    console.error(`Vite environment variable ${envName} is not defined!`);
  }

  return value || '';
}
