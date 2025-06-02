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

  private async addFriends(userId: string, currentUserId: string): Promise<FitFriendEntity> {
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

  public async addFriend(userId: string, currentUserId: string, userRole: Role): Promise<void> {
    this.checkNotAllowForCoach(userRole);

    await this.addFriends(userId, currentUserId);
    await this.addFriends(currentUserId, userId);
  }
}
