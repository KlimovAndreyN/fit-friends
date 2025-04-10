import { Logger } from '@nestjs/common';

import { AuthUser, Location, Role, UserApiProperty } from '@backend/shared/core';
import { getRandomEnumItem, getRandomItem } from '@backend/shared/helpers';
import { FitUserEntity, FitUserRepository } from '@backend/account/fit-user';

import { MOCK_DEFAULT_USER_PASSWORD, MOCK_SPORTSMANS_BACKGROUND_PATHS, MOCK_SWAGGER_USER, MockUser } from './mock-data';

export async function clearUsers(fitUserRepository: FitUserRepository): Promise<void> {
  const ids = await fitUserRepository.getAllIds();

  for (const id of ids) {
    await fitUserRepository.deleteById(id);
  }
}

export async function seedUsers(fitUserRepository: FitUserRepository, mockUsers: MockUser[], role: Role): Promise<FitUserEntity[]> {
  const users: FitUserEntity[] = [];

  for (const { name, gender } of mockUsers) {
    // можно добавлять пользователей через сервис используя DTO, но там будет отправка уведомлений и нужны настройки подключения к RabbitMQ
    const user: AuthUser = {
      email: `${name.toLocaleLowerCase()}@local.ru`,
      name,
      about: `About: my name is ${name}`,
      backgroundPath: getRandomItem(MOCK_SPORTSMANS_BACKGROUND_PATHS),
      gender,
      location: getRandomEnumItem(Location),
      role,
      avatarFileId: '', //! позднее попробовать подкинуть аватарки
      birthday: new Date('2000-01-01'), //! сделать разное
      passwordHash: ''
    };
    const userEntity = new FitUserEntity(user);

    await userEntity.setPassword(MOCK_DEFAULT_USER_PASSWORD);

    if (name === MOCK_SWAGGER_USER) {
      // для удобства тестирования запросов из свагера
      userEntity.id = UserApiProperty.Id.example;

      await fitUserRepository.insertOrUpdate(userEntity);
    }
    else {
      await fitUserRepository.save(userEntity);
    }

    users.push(userEntity);

    Logger.log(`Added user(${role}): ${userEntity.email} / ${MOCK_DEFAULT_USER_PASSWORD} / ${userEntity.id}`);
  }

  return users;
}
