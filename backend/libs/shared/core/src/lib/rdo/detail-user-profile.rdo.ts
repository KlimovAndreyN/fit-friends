import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IDetailUserProfileRdo } from '../interfaces/rdo/i-detail-user-profile.rdo';
import { DetailUserRdo } from './detail-user.rdo';
import { QuestionnaireRdo } from './questionnaire.rdo';

export class DetailUserProfileRdo implements IDetailUserProfileRdo {
  @ApiProperty({ type: DetailUserRdo })
  @Expose()
  public user: IDetailUserProfileRdo['user'];

  @ApiProperty({ type: QuestionnaireRdo })
  @Expose()
  public questionnaire: IDetailUserProfileRdo['questionnaire'];

  @ApiProperty()
  @Expose()
  isFriend?: IDetailUserProfileRdo['isFriend'];

  @ApiProperty({ type: QuestionnaireRdo })
  @Expose()
  personalTrainingRequest?: IDetailUserProfileRdo['personalTrainingRequest'];
}
