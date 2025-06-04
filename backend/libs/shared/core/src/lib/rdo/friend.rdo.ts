import { IntersectionType, PickType } from '@nestjs/swagger';

import { IFriendRdo } from '../interfaces/rdo/i-friend.rdo';
import { UserProfileRdo } from './user-profile.rdo';
import { RequestStatusApiDoc } from '../constants/api-doc/request-status.api-doc';

export class FriendRdo
  extends IntersectionType(
    UserProfileRdo,
    PickType(
      RequestStatusApiDoc,
      [
        'outJointTrainingStatus',
        'inJointTrainingStatus',
        'personalTrainingStatus'
      ]
    )
  )
  implements IFriendRdo { }
