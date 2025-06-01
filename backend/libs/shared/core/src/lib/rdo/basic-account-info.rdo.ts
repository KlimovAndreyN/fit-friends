import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BasicDetailUserRdo } from './basic-detail-user.rdo';
import { BasicQuestionnaireRdo } from './basic-questionnaire.rdo';

export class BasicAccountInfoRdo {
  @ApiProperty()
  @Expose()
  public user: BasicDetailUserRdo;

  @ApiProperty()
  @Expose()
  public questionnaire: BasicQuestionnaireRdo;
}
