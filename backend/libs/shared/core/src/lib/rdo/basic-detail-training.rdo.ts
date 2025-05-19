import { PickType } from '@nestjs/swagger';

import { TrainingApiDoc } from '../constants/api-doc/training.api-doc';
import { IBasicDetailTrainingRdo } from '../interfaces/rdo/i-basic-detail-training.rdo';

export class BasicDetailTrainingRdo
  extends PickType(
    TrainingApiDoc,
    [
      'id',
      'title',
      'backgroundPath',
      'trainingLevel',
      'specialization',
      'duration',
      'price',
      'oldPrice',
      'caloriesWaste',
      'description',
      'rating',
      'gender',
      'isSpecial',
      'createdDate',
      'videoFileId',
      'userId'
    ]
  )
  implements IBasicDetailTrainingRdo { }
