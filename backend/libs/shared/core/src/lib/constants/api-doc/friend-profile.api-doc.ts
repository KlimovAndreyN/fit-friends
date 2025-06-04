import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IFriendProfileRdo } from '../../interfaces/rdo/i-friend-profile.rdo';
import { TrainingRequestRdo } from '../../rdo/training-request.rdo';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export class FriendProfileApiDoc {
  @ApiProperty({ type: TrainingRequestRdo })
  @Expose()
  outJointTraining?: IFriendProfileRdo['outJointTraining'];

  @ApiProperty({ type: TrainingRequestRdo })
  @Expose()
  inJointTraining?: IFriendProfileRdo['inJointTraining'];

  @ApiProperty({ type: TrainingRequestRdo })
  @Expose()
  personalTraining?: IFriendProfileRdo['personalTraining'];
}
