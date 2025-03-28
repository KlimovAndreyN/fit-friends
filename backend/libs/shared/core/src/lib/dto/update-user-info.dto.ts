import { IntersectionType, OmitType } from '@nestjs/swagger';

import { IUpdateUserInfoDto } from '../interfaces/dto/i-update-user-info.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpdateQuestionnaireDto } from './update-questionnaire.dto';
import { Transform } from 'class-transformer';

export class UpdateUserInfoDto
  extends IntersectionType(
    UpdateUserDto,
    OmitType(UpdateQuestionnaireDto, ['readyForTraining'])
  )
  implements IUpdateUserInfoDto {
  @Transform(({ value }) => {
    // из-за 'multipart/form-data' приходит string, а при вторичной транформации, для валидации, уже boolean
    return (typeof value === "string") ? value === 'true' : value;
  })
  public emptyAvatarFile?: UpdateUserDto['emptyAvatarFile'];
};
