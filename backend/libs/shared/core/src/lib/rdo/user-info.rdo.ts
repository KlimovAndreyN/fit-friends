import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IQuestionnaireRdo, IUserInfoRdo } from '../../fronted-index';
import { UserRdo } from './user.rdo';

export class UserInfoRdo implements IUserInfoRdo {
  @ApiProperty()//!
  @Expose()
  public user: UserRdo;

  @ApiProperty()//!
  @Expose()
  public questionnaire: IQuestionnaireRdo;
}
