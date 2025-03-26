import { ApiProperty } from '@nestjs/swagger';

import { IUpdateUserInfoDto } from '../interfaces/dto/i-update-user-info.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpdateQuestionnaireDto } from './update-questionnaire.dto';

export class UpdateUserInfoDto implements IUpdateUserInfoDto {
  @ApiProperty()
  user: UpdateUserDto;

  @ApiProperty()
  questionnaire: UpdateQuestionnaireDto;
}
