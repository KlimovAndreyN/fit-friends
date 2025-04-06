import { PickType } from '@nestjs/swagger';

import { IQuestionnaireRdo } from '../interfaces/rdo/i-questionnaire.rdo';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class QuestionnaireRdo
  extends PickType(
    QuestionnaireApiDoc,
    [
      'specializations',
      'trainingLevel',
      'readyForTraining',
      'duration',
      'caloriesLose',
      'caloriesWaste',
      'description',
      'filePaths',
      'individualTraining'
    ]
  )
  implements IQuestionnaireRdo { }
