import { ForbiddenException, Injectable } from '@nestjs/common';

import { Friend, isCoachRole, Role } from '@backend/shared/core';
import { deleteItem } from '@backend/shared/helpers';

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

  private async addOneFriend(userId: string, currentUserId: string): Promise<FitFriendEntity> {
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

  private async deleteOneFriend(userId: string, currentUserId: string): Promise<FitFriendEntity | void> {
    const entity = await this.fitFriendRepository.findByUserId(currentUserId);

    if (!entity) {
      return;
    }

    const { friends } = entity;

    if (friends.includes(userId)) {
      entity.friends = deleteItem(friends, userId);
      await this.fitFriendRepository.update(entity);
    }

    return entity;
  }

  public async checkFriend(userId: string, currentUserId: string): Promise<boolean> {
    const entity = await this.fitFriendRepository.findByUserId(currentUserId);

    if (!entity) {
      return false;
    }

    return entity.friends.includes(userId);
  }

  public async addFriend(userId: string, currentUserId: string, userRole: Role): Promise<void> {
    this.checkNotAllowForCoach(userRole);

    await this.addOneFriend(userId, currentUserId);
    await this.addOneFriend(currentUserId, userId);
  }

  public async deleteFriend(userId: string, currentUserId: string, userRole: Role): Promise<void> {
    this.checkNotAllowForCoach(userRole);

    await this.deleteOneFriend(userId, currentUserId);
    await this.deleteOneFriend(currentUserId, userId);
  }
}
