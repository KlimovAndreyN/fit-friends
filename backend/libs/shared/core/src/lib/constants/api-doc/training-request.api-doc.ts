import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

import { IFriendProfileRdo } from '../../interfaces/rdo/i-friend-profile.rdo';
import { TrainingRequestStatus } from '../../types/training-request-status.enum';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export class TrainingRequestApiDoc {
  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  outJointTrainingStatus?: IFriendProfileRdo['outJointTrainingStatus'];

  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  inJointTrainingStatus?: IFriendProfileRdo['inJointTrainingStatus'];

  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  personalTrainingStatus?: IFriendProfileRdo['personalTrainingStatus'];
}
