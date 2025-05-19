import { PickType } from '@nestjs/swagger';

import { ITrainingRdo } from '../interfaces/rdo/i-training.rdo';
import { TrainingApiDoc } from '../constants/api-doc/training.api-doc';

export class TrainingRdo
  extends PickType(
    TrainingApiDoc,
    [
      'id',
      'title',
      'backgroundPath',
      'specialization',
      'price',
      'oldPrice',
      'caloriesWaste',
      'description',
      'rating',
      'isSpecial',
      'createdDate'
    ]
  )
  implements ITrainingRdo { }
