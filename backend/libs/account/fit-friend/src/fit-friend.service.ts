import { ForbiddenException, Injectable } from '@nestjs/common';

import { Friend, isCoachRole, PageQuery, PaginationResult, Role } from '@backend/shared/core';
import { deleteItem } from '@backend/shared/helpers';

import { FitFriendRepository } from './fit-friend.repository';
import { FitFriendEntity } from './fit-friend.entity';

//! убрать лимиты в константы
const Default = {
  PAGE: 1,
  LIMIT_MAX: 50
} as const;

@Injectable()
export class FitFriendService {
  constructor(
    private readonly fitFriendRepository: FitFriendRepository
  ) { }

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

  public async findByUserId(userId: string, query: PageQuery): Promise<PaginationResult<string>> {
    const {
      page: currentPage = Default.PAGE,
      limit: take = Default.LIMIT_MAX
    } = query;
    const skip = (currentPage - 1) * take;
    const entity = await this.fitFriendRepository.findByUserId(userId);
    const friends = (entity) ? entity.friends : [];
    const entities = friends.slice(skip, skip + take);
    const totalItems = friends.length;
    const totalPages = Math.ceil(totalItems / take);

    return {
      entities,
      currentPage,
      totalPages,
      itemsPerPage: take,
      totalItems
    }
  }

  public async checkFriend(userId: string, currentUserId: string): Promise<boolean> {
    const entity = await this.fitFriendRepository.findByUserId(currentUserId);

    if (!entity) {
      return false;
    }

    return entity.friends.includes(userId);
  }

  public async addFriend(userId: string, currentUserId: string, userRole: Role): Promise<void> {
    // обеденить с FitUserProfileServiceюcheckNotAllowForCoach
    if (isCoachRole(userRole)) {
      throw new ForbiddenException('Not allow for coach!');
    }

    await this.addOneFriend(userId, currentUserId);
    await this.addOneFriend(currentUserId, userId);
  }

  public async deleteFriend(userId: string, currentUserId: string): Promise<void> {
    await this.deleteOneFriend(userId, currentUserId);
    await this.deleteOneFriend(currentUserId, userId);
  }
}
