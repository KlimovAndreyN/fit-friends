import { PickType } from '@nestjs/swagger';

import { IDetailTrainingRdo } from '../interfaces/rdo/i-detail-training.rdo';
import { TrainingApiDoc } from '../constants/api-doc/training.api-doc';

export class DetailTrainingRdo
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
      'caloriesWaste',
      'description',
      'rating',
      'gender',
      'isSpecial',
      'createdDate',
      'videoFilePath',
      'coach'
    ]
  )
  implements IDetailTrainingRdo { }
