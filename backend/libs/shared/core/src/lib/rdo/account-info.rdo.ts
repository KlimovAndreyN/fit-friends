import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IAccountInfoRdo } from '../interfaces/rdo/i-account-info.rdo';
import { DetailUserRdo } from './detail-user.rdo';
import { QuestionnaireRdo } from './questionnaire.rdo';

export class AccountInfoRdo implements IAccountInfoRdo {
  @ApiProperty()
  @Expose()
  public user: DetailUserRdo;

  @ApiProperty()
  @Expose()
  public questionnaire: QuestionnaireRdo;
}
