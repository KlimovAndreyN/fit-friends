import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';

import { Friend, isCoachRole, PageQuery, PaginationResult, Role } from '@backend/shared/core';

import { FitFriendRepository } from './fit-friend.repository';
import { FitFriendEntity } from './fit-friend.entity';

@Injectable()
export class FitFriendService {
  constructor(
    private readonly fitFriendRepository: FitFriendRepository
  ) { }

  private getFriendsIds(entities: FitFriendEntity[], userId: string): string[] {
    const friendsIds: string[] = [];

    entities.forEach(({ firstFriendId, secondFriendId }) => {
      [firstFriendId, secondFriendId].forEach((item) => {
        if (item !== userId) {
          friendsIds.push(item);
        }
      });
    });

    return friendsIds;
  }

  public async findByUserId(userId: string, query: PageQuery): Promise<PaginationResult<string>> {
    const {
      entities,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages
    } = await this.fitFriendRepository.findByUserId(userId, query);

    return {
      entities: this.getFriendsIds(entities, userId),
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems
    };
  }

  public async checkFriend(userId: string, currentUserId: string): Promise<boolean> {
    const entity = await this.fitFriendRepository.findFriend(currentUserId, userId);

    if (!entity) {
      return false;
    }

    return true;
  }

  public async addFriend(userId: string, currentUserId: string, userRole: Role): Promise<FitFriendEntity> {
    // обеденить с FitUserProfileServiceюcheckNotAllowForCoach
    if (isCoachRole(userRole)) {
      throw new ForbiddenException('Not allow for coach!');
    }

    if (userId === currentUserId) {
      throw new ConflictException('Cannot create a friend with identical Ids!');
    }

    const isFriend = await this.checkFriend(currentUserId, userId);

    if (isFriend) {
      throw new ConflictException('Users already friends!');
    }

    const friend: Friend = { firstFriendId: currentUserId, secondFriendId: userId };
    const entity = new FitFriendEntity(friend);

    await this.fitFriendRepository.save(entity);

    return entity;
  }

  public async deleteFriend(userId: string, currentUserId: string): Promise<void> {
    const entity = await this.fitFriendRepository.findFriend(currentUserId, userId);

    if (!entity) {
      throw new ConflictException('Users not friends!');
    }

    await this.fitFriendRepository.deleteById(entity.id);
  }
}
