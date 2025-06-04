import { IntersectionType, PickType } from '@nestjs/swagger';

import { IFriendProfileRdo } from '../interfaces/rdo/i-friend-profile.rdo';
import { UserProfileRdo } from './user-profile.rdo';
import { TrainingRequestApiDoc } from '../constants/api-doc/training-request.api-doc';

export class FriendProfileRdo
  extends IntersectionType(
    UserProfileRdo,
    PickType(
      TrainingRequestApiDoc,
      [
        'outJointTrainingStatus',
        'inJointTrainingStatus',
        'personalTrainingStatus'
      ]
    )
  )
  implements IFriendProfileRdo { }
