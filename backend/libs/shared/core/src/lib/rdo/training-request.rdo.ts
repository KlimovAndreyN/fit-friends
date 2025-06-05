import { PickType } from '@nestjs/swagger';

import { TrainingRequestApiDoc } from '../constants/api-doc/training-request.api-doc';
import { ITrainingRequestRdo } from '../interfaces/rdo/i-training-request.rdo';

export class TrainingRequestRdo
  extends PickType(
    TrainingRequestApiDoc,
    [
      'id',
      'status',
      'updatedAt'
    ]
  )
  implements ITrainingRequestRdo { }
