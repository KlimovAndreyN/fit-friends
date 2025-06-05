import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

import { TrainingRequestStatus } from '../../types/training-request-status.enum';
import { ITrainingRequestRdo } from '../../interfaces/rdo/i-training-request.rdo';
import { ICreateTrainingRequestDto } from '../../interfaces/dto/i-create-training-request.dto';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export class TrainingRequestApiDoc {
  @ApiProperty()
  @Expose()
  id: ITrainingRequestRdo['id'];

  @ApiProperty()
  @Expose()
  userId: ICreateTrainingRequestDto['userId'];

  @ApiProperty()
  @Expose()
  @IsEnum(TrainingRequestStatus)
  status: ITrainingRequestRdo['status'];

  @ApiProperty()
  @Expose()
  updatedAt: ITrainingRequestRdo['updatedAt'];
}
