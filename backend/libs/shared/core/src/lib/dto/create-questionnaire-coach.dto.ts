import { PickType } from '@nestjs/swagger';

import { ICreateQuestionnaireCoachDto } from '../interfaces/dto/i-create-questionnaire-coach.dto';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class CreateQuestionnaireCoachDto
  extends PickType(
    QuestionnaireApiDoc,
    [
      'specializations',
      'trainingLevel',
      'description',
      'files',
      'individualTraining'
    ]
  )
  implements ICreateQuestionnaireCoachDto { }
