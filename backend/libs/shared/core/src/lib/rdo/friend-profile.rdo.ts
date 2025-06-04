import { IntersectionType, PickType } from '@nestjs/swagger';

import { IFriendProfileRdo } from '../interfaces/rdo/i-friend-profile.rdo';
import { UserProfileRdo } from './user-profile.rdo';
import { FriendProfileApiDoc } from '../constants/api-doc/friend-profile.api-doc';

export class FriendProfileRdo
  extends IntersectionType(
    UserProfileRdo,
    PickType(
      FriendProfileApiDoc,
      [
        'outJointTraining',
        'inJointTraining',
        'personalTraining'
      ]
    )
  )
  implements IFriendProfileRdo { }
