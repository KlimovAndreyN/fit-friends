import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConnectionNameOption, SortDirection } from '@backend/shared/core';
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

  public async getReadyForTrainingUserIds(): Promise<string[]> {
    const documents = await this.model.find()
      .select({ userId: true })
      .where({ readyForTraining: true })
      .sort({ createdAt: SortDirection.Desc })
      .exec();

    return documents.map(({ userId }) => (userId));
  }
}
