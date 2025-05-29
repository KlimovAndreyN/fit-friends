import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { ConnectionNameOption, Location, PaginationResult, Role, SortDirection } from '@backend/shared/core';
import { BaseMongoRepository } from '@backend/shared/data-access';

import { FitUserEntity } from './fit-user.entity';
import { FitUserFactory } from './fit-user.factory';
import { FitUserModel } from './fit-user.model';

@Injectable()
export class FitUserRepository extends BaseMongoRepository<FitUserEntity, FitUserModel> {
  constructor(
    entityFactory: FitUserFactory,
    @InjectModel(FitUserModel.name, ConnectionNameOption.Account)
    fitUserModel: Model<FitUserModel>
  ) {
    super(entityFactory, fitUserModel);
  }

  private calculateUsersPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findByEmail(email: string): Promise<FitUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }

  public async findManyWithPagination( // Попробовать вынести пагинацию в базовый класс BaseMongoRepository
    currentPage: number,
    take: number,
    withoutIds: string[] = [],
    withIds: string[] = [],
    role?: Role,
    locations?: Location[]
  ): Promise<PaginationResult<FitUserEntity>> {
    const skip = (currentPage - 1) * take;
    const where: FilterQuery<FitUserModel> = { _id: { $nin: withoutIds, $in: withIds } };

    if (role) {
      where.role = role;
    }

    if (locations && locations.length) {
      where.location = { $in: locations };
    }

    const [entities, usersCount] = await Promise.all(
      [
        this.model.find().where(where).sort({ createdAt: SortDirection.Desc }).skip(skip).limit(take).exec(),
        this.getDocumentsCount(where)
      ]
    );

    return {
      entities: this.createEntitesFromDocuments(entities),
      currentPage,
      totalPages: this.calculateUsersPage(usersCount, take),
      itemsPerPage: take,
      totalItems: usersCount
    }
  }

  public async findMany(withoutIds: string[] = []): Promise<FitUserEntity[]> {
    const documents = await this.model.find()
      .where({ _id: { $nin: withoutIds } })
      .sort({ createdAt: SortDirection.Desc })
      .exec();

    return this.createEntitesFromDocuments(documents);
  }
}
