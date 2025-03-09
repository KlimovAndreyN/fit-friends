import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/shared/data-access';

import { FitUserEntity } from './fit-user.entity';
import { FitUserFactory } from './fit-user.factory';
import { FitUserModel } from './fit-user.model';

@Injectable()
export class FitUserRepository extends BaseMongoRepository<FitUserEntity, FitUserModel> {
  constructor(
    entityFactory: FitUserFactory,
    @InjectModel(FitUserModel.name)
    fitUserModel: Model<FitUserModel>
  ) {
    super(entityFactory, fitUserModel);
  }

  public async findByEmail(email: string): Promise<FitUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }
}
