import { ValidationError } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export function getPortEnv(evnName: string, defaultPort: number): number {
  return parseInt(process.env[evnName] || `${defaultPort}`, 10)
}

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options
  });
}

export function getMongoConnectionString({ host, port, user, password, database, authBase }): string {
  return `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=${authBase}`;
}

export function getRabbitMQConnectionString({ host, port, user, password }): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getValidationErrorString(errors: ValidationError[]): string {
  const errorList = errors.map((item: ValidationError) => (Object.values(item.constraints).join(', ')));

  return errorList.join(', ');
}

export function cutExtention(filename: string): string {
  const [, ...words] = filename.split('.').reverse();

  return words.join('.');
}

export function fixEncoding(filename: string): string {
  // проблемма с кодировкой в имени файла, даже из swagger приходят кривые имена
  // можно в 'ascii', а потом ''
  // еще есть encodeURIComponent и decodeURIComponent
  // возможно стоит проверить версии бибилотек multer, nest.js ...
  return Buffer.from(filename, 'latin1').toString('utf8');
}
export function addEnvPrefix(envPrefix: string, envName: string): string {
  return `${envPrefix}_${envName}`;
}
