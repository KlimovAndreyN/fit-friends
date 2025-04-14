import { PickType } from '@nestjs/swagger';

import { IReviewRdo } from '../interfaces/rdo/i-review.rdo';
import { ReviewApiDoc } from '../constants/api-doc/review.api-doc';

export class ReviewRdo
  extends PickType(
    ReviewApiDoc,
    [
      'message',
      'rating',
      'createdAt',
      'user'
    ]
  )
  implements IReviewRdo { }
