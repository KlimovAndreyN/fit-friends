import { PartialType, PickType } from '@nestjs/swagger';

import { IUpdateQuestionnaireDto } from '../interfaces/dto/i-update-questionnaire.dto';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class UpdateQuestionnaireDto
  extends PickType(
    PartialType(QuestionnaireApiDoc),
    [
      'specializations',
      'trainingLevel',
      'readyForTraining',
    ]
  )
  implements IUpdateQuestionnaireDto { }
