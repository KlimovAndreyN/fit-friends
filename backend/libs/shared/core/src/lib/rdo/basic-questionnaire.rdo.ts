import { PickType } from '@nestjs/swagger';

import { IBasicQuestionnaireRdo } from '../interfaces/rdo/i-basic-questionnaire.rdo';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class BasicQuestionnaireRdo
  extends PickType(
    QuestionnaireApiDoc,
    [
      'userId',
      'specializations',
      'trainingLevel',
      'readyForTraining',
      'duration',
      'caloriesLose',
      'caloriesWaste',
      'description',
      'fileIds',
      'individualTraining'
    ]
  )
  implements IBasicQuestionnaireRdo { }
