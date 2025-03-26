import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUserInfoRdo } from '../../fronted-index';
import { UserRdo } from './user.rdo';
import { QuestionnaireRdo } from './questionnaire.rdo';

export class UserInfoRdo implements IUserInfoRdo {
  @ApiProperty()
  @Expose()
  public user: UserRdo;

  @ApiProperty()
  @Expose()
  public questionnaire: QuestionnaireRdo;
}
