import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';
import { ICreateBasicQuestionnaireDto } from '../interfaces/dto/i-create-basic-questionnaire.dto';

export class CreateBasicQuestionnaireDto
  extends IntersectionType(
    PickType(
      QuestionnaireApiDoc,
      [
        'specializations',
        'trainingLevel'
      ]
    ),
    PickType(
      PartialType(QuestionnaireApiDoc),
      [
        'duration',
        'caloriesLose',
        'caloriesWaste',
        'description',
        'fileIds',
        'individualTraining'
      ]
    )
  )
  implements ICreateBasicQuestionnaireDto { }
