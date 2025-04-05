import { Logger } from '@nestjs/common';

import { AuthUser, Location, Role } from '@backend/shared/core';
import { getRandomEnumItem, getRandomItem } from '@backend/shared/helpers';
import { FitUserEntity, FitUserRepository } from '@backend/account/fit-user';

import { MOCK_SPORTSMANS, MOCK_DEFAULT_USER_PASSWORD, MOCK_BACKGROUND_PATHS } from './mock-data';

export async function generateSportsmans(fitUserRepository: FitUserRepository, resetBeforeSeed: boolean): Promise<FitUserEntity[]> {
  const users: FitUserEntity[] = [];

  if (resetBeforeSeed) {
    const ids = await fitUserRepository.getAllIds();

    for (const id of ids) {
      await fitUserRepository.deleteById(id);
    }
  }

  for (const { name, gender } of MOCK_SPORTSMANS) {
    const user: AuthUser = {
      email: `${name.toLocaleLowerCase()}@local.ru`,
      name,
      about: `About: my name is ${name}`,
      backgroundPath: getRandomItem(MOCK_BACKGROUND_PATHS),
      gender,
      location: getRandomEnumItem(Location),
      role: Role.Sportsman,
      avatarFileId: '', //! позднее попробовать подкинуть аватарки
      birthday: new Date('2000-01-01'), //! сделать разное
      passwordHash: ''
    };
    const userEntity = new FitUserEntity(user);

    await userEntity.setPassword(MOCK_DEFAULT_USER_PASSWORD);
    await fitUserRepository.save(userEntity);
    users.push(userEntity);

    Logger.log(`Added sportsman: ${userEntity.email} / ${MOCK_DEFAULT_USER_PASSWORD} / ${userEntity.id}`);
  }

  return users;
}
