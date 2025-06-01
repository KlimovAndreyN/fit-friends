import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IDetailUserProfileRdo } from '../interfaces/rdo/i-detail-user-profile.rdo';
import { DetailUserRdo } from './detail-user.rdo';
import { QuestionnaireRdo } from './questionnaire.rdo';

export class DetailUserProfileRdo implements IDetailUserProfileRdo {
  @ApiProperty()
  @Expose()
  public user: DetailUserRdo;

  @ApiProperty()
  @Expose()
  public questionnaire: QuestionnaireRdo;

  @ApiProperty()
  @Expose()
  isFriend: boolean;
}
