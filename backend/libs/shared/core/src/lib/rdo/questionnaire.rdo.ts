import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { QuestionnaireWithFileIdsRdo } from './questionnaire-with-file-ids.rdo';
import { IQuestionnaireRdo } from '../interfaces/rdo/i-questionnaire.dto';

export class QuestionnaireRdo extends OmitType(QuestionnaireWithFileIdsRdo, ['fileIds']) implements IQuestionnaireRdo {
  //!@ApiProperty()
  @Expose()
  public filePaths: IQuestionnaireRdo['filePaths'];
}
