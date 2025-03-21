import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@backend/shared/data-access';

import { FitQuestionnaireEntity } from './fit-questionnaire.entity';
import { FitQuestionnaireFactory } from './fit-questionnaire.factory';
import { FitQuestionnaireModel } from './fit-questionnaire.model';

@Injectable()
export class FitQuestionnaireRepository extends BaseMongoRepository<FitQuestionnaireEntity, FitQuestionnaireModel> {
  constructor(
    entityFactory: FitQuestionnaireFactory,
    @InjectModel(FitQuestionnaireModel.name)
    fitUserModel: Model<FitQuestionnaireModel>
  ) {
    super(entityFactory, fitUserModel);
  }
}
