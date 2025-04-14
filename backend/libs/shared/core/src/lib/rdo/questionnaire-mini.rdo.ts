import { PickType } from '@nestjs/swagger';

import { IQuestionnaireMiniRdo } from '../interfaces/rdo/i-questionnaire-mini.rdo';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class QuestionnaireMiniRdo
  extends PickType(
    QuestionnaireApiDoc,
    [
      'userId',
      'specializations'
    ]
  )
  implements IQuestionnaireMiniRdo { }
