import { Logger } from '@nestjs/common';

import { AuthUser, MetroStationName, UserRole } from '@backend/shared/core';
import { FitUserEntity, FitUserRepository } from '@backend/account/fit-user';

import { getRandomItem } from './random';
import { MOCK_SPORTSMANS, MOCK_DEFAULT_USER_PASSWORD, MOCK_BACKGROUND_PATHS } from './mock-data';

export async function generateSportsmans(fitUserRepository: FitUserRepository): Promise<FitUserEntity[]> {
  const users: FitUserEntity[] = [];

  for (const { name, gender } of MOCK_SPORTSMANS) {
    const user: AuthUser = {
      email: `${name.toLocaleLowerCase()}@local.ru`,
      name,
      about: `About: my name is ${name}`,
      backgroundPath: getRandomItem(MOCK_BACKGROUND_PATHS),
      gender,
      metroStationName: getRandomItem(Object.values(MetroStationName)),
      role: UserRole.Sportsman,
      avatarFileId: '', //! позднее попробовать подкинуть аватарки
      birthday: new Date('2000-01-01'), //! сделать разное
      passwordHash: ''
    };

    const userEntity = new FitUserEntity(user);

    await userEntity.setPassword(MOCK_DEFAULT_USER_PASSWORD);
    await fitUserRepository.save(userEntity);
    users.push(userEntity);

    Logger.log(`Added sportsman: ${user.email} / ${MOCK_DEFAULT_USER_PASSWORD}`);
  }

  return users;
}
