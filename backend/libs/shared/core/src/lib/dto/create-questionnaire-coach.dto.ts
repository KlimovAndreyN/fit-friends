import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { FILES_PROPERTY, ICreateQuestionnaireCoachDto } from '../interfaces/dto/i-create-questionnaire-coach.dto';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

// т.к. будет multipart/form-data, то специализации будут .0 , .1... потом будет [] и преобразование, а затем повторная проверка
type ICreateQuestionnaireCoachWithPartialSpecializationsDto =
  Omit<ICreateQuestionnaireCoachDto, 'specializations'>
  & { specializations?: ICreateQuestionnaireCoachDto['specializations'] };

export class CreateQuestionnaireCoachDto
  extends IntersectionType(
    PartialType(
      PickType(QuestionnaireApiDoc, ['specializations'])
    ),
    PickType(
      QuestionnaireApiDoc,
      [
        'trainingLevel',
        'description',
        FILES_PROPERTY,
        'individualTraining'
      ]
    )
  )
  implements ICreateQuestionnaireCoachWithPartialSpecializationsDto { }
