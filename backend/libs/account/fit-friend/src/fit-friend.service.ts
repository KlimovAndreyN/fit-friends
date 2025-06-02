import { ForbiddenException, Injectable } from '@nestjs/common';

import { Friend, isCoachRole, Role } from '@backend/shared/core';

import { FitFriendRepository } from './fit-friend.repository';
import { FitFriendEntity } from './fit-friend.entity';

@Injectable()
export class FitFriendService {
  constructor(
    private readonly fitFriendRepository: FitFriendRepository
  ) { }

  // обеденить с FitUserProfileServiceюcheckNotAllowForCoach
  private checkNotAllowForCoach(role: Role) {
    if (isCoachRole(role)) {
      throw new ForbiddenException('Not allow for coach!');
    }
  }

  public async findByUserId(userId: string): Promise<FitFriendEntity> {
    const entity = await this.fitFriendRepository.findByUserId(userId);

    return entity;
  }

  public async addFriend(userId: string, currentUserId: string, userRole: Role): Promise<FitFriendEntity> {
    this.checkNotAllowForCoach(userRole);

    let entity = await this.fitFriendRepository.findByUserId(currentUserId);

    if (!entity) {
      const friend: Friend = { userId: currentUserId, friends: [userId] };

      entity = new FitFriendEntity(friend);
      await this.fitFriendRepository.save(entity);
    } else {
      const { friends } = entity;

      if (!friends.includes(userId)) {
        friends.unshift(userId);
        await this.fitFriendRepository.update(entity);
      }
    }

    return entity;
  }
}
