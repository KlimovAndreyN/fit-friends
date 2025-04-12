import { IntersectionType, PickType } from '@nestjs/swagger';

import { IUserProfileRdo } from '../interfaces/rdo/i-user-profile.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class UserProfileRdo
  extends IntersectionType(
    PickType(
      UserApiDoc,
      [
        'id',
        'name',
        'avatarFilePath',
        'location'
      ]
    ),
    PickType(
      QuestionnaireApiDoc,
      [
        'specializations'
      ]
    )
  )
  implements IUserProfileRdo { }

