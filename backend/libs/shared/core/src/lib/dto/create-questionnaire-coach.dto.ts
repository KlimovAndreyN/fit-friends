import { PickType } from '@nestjs/swagger';

import { FILES_PROPERTY, ICreateQuestionnaireCoachDto } from '../interfaces/dto/i-create-questionnaire-coach.dto';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class CreateQuestionnaireCoachDto
  extends PickType(
    QuestionnaireApiDoc,
    [
      'specializations',
      'trainingLevel',
      'description',
      FILES_PROPERTY,
      'individualTraining'
    ]
  )
  implements ICreateQuestionnaireCoachDto { }
