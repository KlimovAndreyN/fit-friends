import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Questionnaire } from '../interfaces/questionnaire.interface';
import { IQuestionnaireWithFileIdsRdo } from '../interfaces/rdo/i-questionnaire-with-file-ids.rdo';
import { BaseQuestionnaireDto } from '../dto/base-questionnaire.dto';

export class QuestionnaireWithFileIdsRdo
  extends PickType(
    BaseQuestionnaireDto,
    [
      'specializations',
      'level',
      'time',
      'caloriesLose',
      'caloriesWaste',
      'description',
      'fileIds',
      'individualTraining'
    ]
  ) implements IQuestionnaireWithFileIdsRdo {
  //!
  //@ApiProperty(QuestionnaireApiProperty.ReadyForTraining)
  @Expose()
  readyForTraining: Questionnaire['readyForTraining']

  //! перенести в base?
}
