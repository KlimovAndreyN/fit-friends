import { PartialType, PickType } from '@nestjs/swagger';

import { IUpdateQuestionnaireDto } from '../interfaces/dto/i-update-questionnaire.dto';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

//! если будут файл для тренера, то сделать UpdateQuestionnaireWithFileIdsDto, а здесь исключить id файлов и добавить пути к файлам
export class UpdateQuestionnaireDto
  extends PickType(
    PartialType(QuestionnaireApiDoc),
    [
      'specializations',
      'level',
      'readyForTraining',
    ]
  )
  implements IUpdateQuestionnaireDto { }
