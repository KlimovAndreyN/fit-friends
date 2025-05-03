import { promises as fs } from 'fs';
import { resolve } from 'node:path';
import { Logger } from '@nestjs/common';

import { createDirectory, deleteDirectory } from '@backend/shared/helpers';
import { FileUploaderRepository } from '@backend/file-storage/file-uploader';

export async function clearFiles(fileUploaderRepository: FileUploaderRepository, path: string, distPath: string): Promise<void> {
  await deleteDirectory(path);
  await deleteDirectory(distPath);

  const ids = await fileUploaderRepository.getAllIds();

  for (const id of ids) {
    await fileUploaderRepository.deleteById(id);
  }
}

export async function seedFiles(fileUploaderRepository: FileUploaderRepository, fromPath: string, toPath: string, toDistPath: string): Promise<string[]> {
  await createDirectory(toPath);
  await createDirectory(toDistPath);

  const fileIds = [];

  try {
    const files = await fs.readdir(fromPath);

    for (const file of files) {
      const sourceFile = resolve(fromPath, file);
      const destinationFile = resolve(toPath, file);
      const destinationDistFile = resolve(toDistPath, file);
      const stats = await fs.stat(sourceFile);

      if (stats.isFile()) {
        try {
          console.log(sourceFile);
          console.log(`File: ${file}, stats: ${JSON.stringify(stats)}`);

          await fs.copyFile(sourceFile, destinationFile);
          await fs.copyFile(sourceFile, destinationDistFile);
          console.log('Файл успешно скопирован!');
        } catch (err) {
          console.error('Ошибка при копировании файла:', err);
        }
      }
    }
  } catch (err) {
    console.error(`Ошибка чтения каталога: ${fromPath}`, err);
  }

  /*
  import { promises as fs } from 'fs';
  
  async function copyFile() {
    const sourceFile = 'source.txt'; // Путь к исходному файлу
    const destinationFile = 'destination.txt'; // Путь к файлу назначения
  
    try {
      await fs.copyFile(sourceFile, destinationFile);
      console.log('Файл успешно скопирован!');
    } catch (err) {
      console.error('Ошибка при копировании файла:', err);
    }
  }
  */

  /*
  const users: FitUserEntity[] = [];
  const backgroundPaths = [...(isSportsmanRole(role) ? BackgroundPaths.SPORTSMANS : BackgroundPaths.COACHS)];
  const { MIN_DATE, MAX_DATE } = TrainingOption;

  for (const { name, gender } of mockUsers) {
    // можно добавлять пользователей через сервис используя DTO, но там будет отправка уведомлений и нужны настройки подключения к RabbitMQ
    const user: AuthUser = {
      email: `${name.toLocaleLowerCase()}@local.ru`,
      name,
      about: `About: my name is ${name}`,
      backgroundPath: getRandomItem(backgroundPaths),
      gender,
      location: getRandomEnumItem(Location),
      role,
      avatarFileId: '', //! позднее попробовать подкинуть аватарки
      birthday: getRandomDate(MIN_DATE, MAX_DATE),
      passwordHash: ''
    };
    const userEntity = new FitUserEntity(user);

    await userEntity.setPassword(DEFAULT_USER_PASSWORD);

    //! может и для тренера MOCK_SWAGGER_COACH боже добавить постоянный id.... и в TrainingQuery - public coachId? - @ApiProperty({... example: UserApiProperty.CoachId.example
    if (name === SWAGGER_USER) { // для удобства тестирования запросов из свагера
      userEntity.id = UserApiProperty.Id.example;

      await fitUserRepository.insertOrUpdate(userEntity);
    }
    else {
      await fitUserRepository.save(userEntity);
    }

    users.push(userEntity);

    Logger.log(`Added user(${role}): ${userEntity.email} / ${DEFAULT_USER_PASSWORD} / ${userEntity.id}`);
  }
  */

  return fileIds;
}
