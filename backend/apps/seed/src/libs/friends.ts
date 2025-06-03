import { FitUserEntity } from '@backend/account/fit-user';
import { FitFriendEntity, FitFriendRepository } from '@backend/account/fit-friend';

import { isSwaggers } from './common';

export async function clearFriends(fitFriendRepository: FitFriendRepository): Promise<void> {
  fitFriendRepository.deleteAll();
}

async function seedFriendsFromFriendsIds(
  fitFriendRepository: FitFriendRepository,
  firstFriendId: string,
  secondFriendsIds: string[]
): Promise<FitFriendEntity[]> {
  const friendsEntities: FitFriendEntity[] = [];

  for (const secondFriendId of secondFriendsIds) {
    const friendEntity = new FitFriendEntity({ firstFriendId, secondFriendId });

    await fitFriendRepository.save(friendEntity);
    friendsEntities.push(friendEntity);
  }

  return friendsEntities;
}

export async function seedFriends(
  fitFriendRepository: FitFriendRepository,
  sportsmans: FitUserEntity[],
  coaches: FitUserEntity[]
): Promise<FitFriendEntity[]> {
  const friendsEntities: FitFriendEntity[] = [];
  const noSwaggerSportsmansIds = sportsmans
    .filter(({ name }) => (!isSwaggers(name)))
    .map(({ id }) => (id));
  const coachesIds = coaches.map(({ id }) => (id));

  for (const { id, name } of sportsmans) {
    if (isSwaggers(name)) {
      const entities = await seedFriendsFromFriendsIds(fitFriendRepository, id, noSwaggerSportsmansIds);

      friendsEntities.push(...entities);
    }

    const entities = await seedFriendsFromFriendsIds(fitFriendRepository, id, coachesIds);

    friendsEntities.push(...entities);
  }

  return friendsEntities;
}
