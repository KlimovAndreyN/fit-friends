import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

import { IFriendRdo } from '../../interfaces/rdo/i-friend.rdo';
import { TrainingRequestStatus } from '../../types/training-request-status.enum';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export class RequestStatusApiDoc {
  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  outJointTrainingStatus?: IFriendRdo['outJointTrainingStatus'];

  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  inMyJointTrainingStatus?: IFriendRdo['inMyJointTrainingStatus'];

  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  personalTrainingStatus?: IFriendRdo['personalTrainingStatus'];
}
