import { IntersectionType, PickType } from '@nestjs/swagger';

import { IFriendProfileRdo } from '../interfaces/rdo/i-friend-profile.rdo';
import { UserProfileRdo } from './user-profile.rdo';
import { RequestStatusApiDoc } from '../constants/api-doc/request-status.api-doc';

export class FriendProfileRdo
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
  implements IFriendProfileRdo { }
