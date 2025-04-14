import { PickType } from '@nestjs/swagger';

import { IBasicReviewRdo } from '../interfaces/rdo/i-basic-review.rdo';
import { ReviewApiDoc } from '../constants/api-doc/review.api-doc';

export class BasicReviewRdo
  extends PickType(
    ReviewApiDoc,
    [
      'message',
      'rating',
      'createdAt',
      'userId'
    ]
  )
  implements IBasicReviewRdo { }
