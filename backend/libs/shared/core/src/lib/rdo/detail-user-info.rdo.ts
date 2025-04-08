import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IDetailUserInfoRdo } from '../interfaces/rdo/i-detail-user-info.rdo';
import { DetailUserRdo } from './detail-user.rdo';
import { QuestionnaireRdo } from './questionnaire.rdo';

export class DetailUserInfoRdo implements IDetailUserInfoRdo {
  @ApiProperty()
  @Expose()
  public user: DetailUserRdo;

  @ApiProperty()
  @Expose()
  public questionnaire: QuestionnaireRdo;
}
