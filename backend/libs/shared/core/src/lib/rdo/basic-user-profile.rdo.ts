import { IntersectionType, PickType } from '@nestjs/swagger';

import { IBasicUserProfileRdo } from '../interfaces/rdo/i-basic-user-profile.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class BasicUserProfileRdo
  extends IntersectionType(
    PickType(
      UserApiDoc,
      [
        'id',
        'name',
        'role',
        'avatarFileId',
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
  implements IBasicUserProfileRdo { }

