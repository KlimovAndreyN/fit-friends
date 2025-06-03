import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { ConnectionNameOption, DefaultPagination, PageQuery, PaginationResult, SortDirection } from '@backend/shared/core';
import { BaseMongoRepository } from '@backend/shared/data-access';

import { FitFriendEntity } from './fit-friend.entity';
import { FitFriendFactory } from './fit-friend.factory';
import { FitFriendModel } from './fit-friend.model';

@Injectable()
export class FitFriendRepository extends BaseMongoRepository<FitFriendEntity, FitFriendModel> {
  constructor(
    entityFactory: FitFriendFactory,
    @InjectModel(FitFriendModel.name, ConnectionNameOption.Account)
    fitFriendModel: Model<FitFriendModel>
  ) {
    super(entityFactory, fitFriendModel);
  }

  private calculateUsersPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findFriend(firstFriendId: string, secondFriendId: string): Promise<FitFriendEntity | null> {
    const document = await this.model.findOne({
      $or: [
        { firstFriendId, secondFriendId },
        { firstFriendId: secondFriendId, secondFriendId: firstFriendId }
      ]
    }).exec();

    return this.createEntityFromDocument(document);
  }

  public async findByUserId(userId: string, query: PageQuery): Promise<PaginationResult<FitFriendEntity>> {
    const {
      page: currentPage = DefaultPagination.PAGE,
      limit: take = DefaultPagination.LIMIT_MAX
    } = query;
    const skip = (currentPage - 1) * take;
    const where: FilterQuery<FitFriendModel> = {
      $or: [
        { firstFriendId: userId },
        { secondFriendId: userId }
      ]
    };

    const [entities, friendsCount] = await Promise.all(
      [
        this.model.find().where(where).sort({ createdAt: SortDirection.Desc }).skip(skip).limit(take).exec(),
        this.getDocumentsCount(where)
      ]
    );

    return {
      entities: this.createEntitesFromDocuments(entities),
      currentPage,
      totalPages: this.calculateUsersPage(friendsCount, take),
      itemsPerPage: take,
      totalItems: friendsCount
    };
  }
}
