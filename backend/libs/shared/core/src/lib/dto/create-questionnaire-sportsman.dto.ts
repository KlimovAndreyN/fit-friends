import { PickType } from '@nestjs/swagger';

import { ICreateQuestionnaireSportsmanDto } from '../interfaces/dto/i-create-questionnaire-sportsman.dto';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class CreateQuestionnaireSportsmanDto
  extends PickType(
    QuestionnaireApiDoc,
    [
      'specializations',
      'trainingLevel',
      'time',
      'caloriesLose',
      'caloriesWaste'
    ]
  )
  implements ICreateQuestionnaireSportsmanDto { }
