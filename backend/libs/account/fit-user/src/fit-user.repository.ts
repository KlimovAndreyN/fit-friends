import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConnectionNameOption, Location, Role, SortDirection } from '@backend/shared/core';
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

  public async findByEmail(email: string): Promise<FitUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }

  public async getAll(withoutIds: string[] = [], withIds: string[] = [], role?: Role, locations?: Location[]): Promise<FitUserEntity[]> {
    const where = { _id: { $nin: withoutIds, $in: withIds } };

    if (role) {
      where['role'] = role; // не очень правильно, а как сделать???
    }

    if (locations) {
      where['location'] = { $in: locations }; // не очень правильно, а как сделать???
    }

    const documents = await this.model
      .find()
      .where(where)
      .sort({ createdAt: SortDirection.Desc })
      .exec();

    return documents.map((document) => this.createEntityFromDocument(document));
  }
}
