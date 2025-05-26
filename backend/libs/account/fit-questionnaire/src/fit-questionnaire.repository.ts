import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { BaseMongoRepository } from '@backend/shared/data-access';

import { FitQuestionnaireEntity } from './fit-questionnaire.entity';
import { FitQuestionnaireFactory } from './fit-questionnaire.factory';
import { FitQuestionnaireModel } from './fit-questionnaire.model';

@Injectable()
export class FitQuestionnaireRepository extends BaseMongoRepository<FitQuestionnaireEntity, FitQuestionnaireModel> {
  constructor(
    entityFactory: FitQuestionnaireFactory,
    @InjectModel(FitQuestionnaireModel.name, ConnectionNameOption.Account)
    fitQuestionnaireModel: Model<FitQuestionnaireModel>
  ) {
    super(entityFactory, fitQuestionnaireModel);
  }

  public async findByUserId(userId: string): Promise<FitQuestionnaireEntity | null> {
    const document = await this.model.findOne({ userId }).exec();

    return this.createEntityFromDocument(document);
  }
}
