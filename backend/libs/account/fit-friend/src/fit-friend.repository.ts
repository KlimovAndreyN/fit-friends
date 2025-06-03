import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConnectionNameOption, PageQuery, PaginationResult } from '@backend/shared/core';
import { BaseMongoRepository } from '@backend/shared/data-access';

import { FitFriendEntity } from './fit-friend.entity';
import { FitFriendFactory } from './fit-friend.factory';
import { FitFriendModel } from './fit-friend.model';

//! убрать лимиты в константы
const Default = {
  PAGE: 1,
  LIMIT_MAX: 50
} as const;

@Injectable()
export class FitFriendRepository extends BaseMongoRepository<FitFriendEntity, FitFriendModel> {
  constructor(
    entityFactory: FitFriendFactory,
    @InjectModel(FitFriendModel.name, ConnectionNameOption.Account)
    fitFriendModel: Model<FitFriendModel>
  ) {
    super(entityFactory, fitFriendModel);
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
    const documents = await this.model.find({
      $or: [
        { firstFriendId: userId },
        { secondFriendId: userId }
      ]
    }).exec();

    /*
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
    */


    //! если не сработает, то
    /*
  public async findByUserId(searchedUserId: string): Promise<FitFriendEntity[] | []> {
    const documents = await this.model.find({
      $or: [
        { userId: searchedUserId },
        { friendId: searchedUserId }
      ]
    }).exec();
    */
    //return ;

    return {
      entities: this.createEntitesFromDocuments(documents),
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 1,
      totalItems: 1
    };
  }
}
