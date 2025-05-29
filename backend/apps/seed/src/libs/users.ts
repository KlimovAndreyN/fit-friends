import { Logger } from '@nestjs/common';

import { AuthUser, BackgroundPaths, Gender, isSportsmanRole, Location, Role, UserApiProperty } from '@backend/shared/core';
import { getRandomDate, getRandomEnumItem, getRandomItem } from '@backend/shared/helpers';
import { FitUserEntity, FitUserRepository } from '@backend/account/fit-user';
import { RefreshTokenRepository } from '@backend/account/refresh-token';

import { isSwaggers } from './common';
import { DEFAULT_USER_PASSWORD, SWAGGER_USER, MockUser, UserBirthdayDateOption, UserCreateDateOption } from './mock-data';

export async function clearRefreshTokens(refreshTokenRepository: RefreshTokenRepository): Promise<void> {
  refreshTokenRepository.deleteAll();
}

export async function clearUsers(fitUserRepository: FitUserRepository): Promise<void> {
  fitUserRepository.deleteAll();
}

function getAvatarsFilesIds(femaleAvatarsFilesIds: string[], maleAvatarsFilesIds: string[], gender) {
  switch (gender) {
    case Gender.Female:
      return femaleAvatarsFilesIds;
    case Gender.Male:
      return maleAvatarsFilesIds;
  }

  return [...femaleAvatarsFilesIds, ...maleAvatarsFilesIds];
}

export async function seedUsers(
  fitUserRepository: FitUserRepository,
  mockUsers: MockUser[],
  role: Role,
  femaleAvatarsFilesIds: string[],
  maleAvatarsFilesIds: string[]
): Promise<FitUserEntity[]> {
  const users: FitUserEntity[] = [];
  const backgroundPaths = [...(isSportsmanRole(role) ? BackgroundPaths.SPORTSMANS : BackgroundPaths.COACHS)];

  for (const { name, gender } of mockUsers) {
    const avatarsFilesIds = getAvatarsFilesIds(femaleAvatarsFilesIds, maleAvatarsFilesIds, gender);
    // можно добавлять пользователей через сервис используя DTO, но там будет отправка уведомлений и нужны настройки подключения к RabbitMQ
    const user: AuthUser = {
      email: `${name.toLocaleLowerCase()}@local.ru`,
      name,
      about: `About: my name is ${name}`,
      backgroundPath: getRandomItem(backgroundPaths),
      gender,
      location: getRandomEnumItem(Location),
      role,
      avatarFileId: getRandomItem(avatarsFilesIds),
      birthday: getRandomDate(UserBirthdayDateOption.MIN, UserBirthdayDateOption.MAX),
      passwordHash: ''
    };
    const userEntity = new FitUserEntity(user);

    await userEntity.setPassword(DEFAULT_USER_PASSWORD);

    // для удобства проверки главной страницы и каталога пользователей, сортировка по дате
    if (!isSwaggers(name)) {
      userEntity.createdAt = getRandomDate(UserCreateDateOption.MIN, UserCreateDateOption.MAX);
    }

    //! может и для тренера MOCK_SWAGGER_COACH боже добавить постоянный id.... и в TrainingQuery - public coachId? - @ApiProperty({... example: UserApiProperty.CoachId.example
    if (name === SWAGGER_USER) { // для удобства тестирования запросов из свагера
      userEntity.id = UserApiProperty.Id.example;

      // запись создается с указанным id
      await fitUserRepository.insertOrUpdate(userEntity);
    }
    else {
      await fitUserRepository.save(userEntity);
    }

    users.push(userEntity);

    Logger.log(`Added user(${role}): ${userEntity.email} / ${DEFAULT_USER_PASSWORD} / ${userEntity.id}`);
  }

  return users;
}
