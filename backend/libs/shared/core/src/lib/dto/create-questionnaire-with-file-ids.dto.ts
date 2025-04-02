import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';
import { ICreateQuestionnaireWithFileIdsDto } from '../interfaces/dto/i-create-questionnaire-with-file-ids.dto';

export class CreateQuestionnaireWithFileIdsDto
  extends IntersectionType(
    PickType(QuestionnaireApiDoc,
      [
        'specializations',
        'trainingLevel'
      ]
    ),
    PickType(PartialType(QuestionnaireApiDoc),
      [
        'time',
        'caloriesLose',
        'caloriesWaste',
        'description',
        'fileIds',
        'individualTraining'
      ]
    )
  )
  implements ICreateQuestionnaireWithFileIdsDto { }
