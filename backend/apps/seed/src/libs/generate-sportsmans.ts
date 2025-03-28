import { Logger } from '@nestjs/common';

import { FitUserEntity, FitUserRepository } from '@backend/account/fit-user';

import { MOCK_SPORTSMANS, MOCK_DEFAULT_USER_PASSWORD } from './mock-data';

export async function generateSportsmans(fitUserRepository: FitUserRepository): Promise<FitUserEntity[]> {
  const users: FitUserEntity[] = [];

  for (const user of MOCK_SPORTSMANS) {
    const userEntity = new FitUserEntity(user);

    await userEntity.setPassword(MOCK_DEFAULT_USER_PASSWORD);
    await fitUserRepository.save(userEntity);
    users.push(userEntity);

    Logger.log(`Added sportsman: ${user.email} / ${MOCK_DEFAULT_USER_PASSWORD}`);
  }

  return users;
}
