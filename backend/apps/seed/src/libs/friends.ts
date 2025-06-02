import { FitUserEntity } from '@backend/account/fit-user';
import { FitFriendEntity, FitFriendRepository } from '@backend/account/fit-friend';

import { isSwaggers } from './common';

export async function clearFriends(fitFriendRepository: FitFriendRepository): Promise<void> {
  fitFriendRepository.deleteAll();
}

export async function seedFriends(
  fitFriendRepository: FitFriendRepository,
  sportsmans: FitUserEntity[],
  coaches: FitUserEntity[]
): Promise<FitFriendEntity[]> {
  const friendsEntities: FitFriendEntity[] = [];
  const sportsmansIds = sportsmans.map(({ id }) => (id));
  const swaggerSportsmansIds = sportsmans
    .filter(({ name }) => (isSwaggers(name)))
    .map(({ id }) => (id));
  const noSwaggerSportsmansIds = sportsmans
    .filter(({ name }) => (!isSwaggers(name)))
    .map(({ id }) => (id));
  const coachesIds = coaches.map(({ id }) => (id));

  for (const { id: userId, name } of sportsmans) {
    const friends = [...coachesIds];
    //console.log('friends', friends);

    if (isSwaggers(name)) {
      friends.push(...noSwaggerSportsmansIds);
    } else {
      friends.push(...swaggerSportsmansIds);
    }
    //console.log('friends', friends);

    const friendEntity = new FitFriendEntity({ userId, friends });

    await fitFriendRepository.save(friendEntity);
    friendsEntities.push(friendEntity);
  }

  for (const userId of coachesIds) {
    const friendEntity = new FitFriendEntity({ userId, friends: sportsmansIds });

    await fitFriendRepository.save(friendEntity);
    friendsEntities.push(friendEntity);
  }

  return friendsEntities;
}
