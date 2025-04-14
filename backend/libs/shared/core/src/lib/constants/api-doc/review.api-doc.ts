import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { Review } from '../../interfaces/review.interface';
import { IBasicReviewRdo } from '../../interfaces/rdo/i-basic-review.rdo';
import { UserProfileRdo } from '../../rdo/user-profile.rdo';
import { ReviewApiProperty } from '../api-property/review.api-property';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export class ReviewApiDoc {
  @ApiProperty(ReviewApiProperty.Message)
  @Expose()
  @IsString()
  public message: Review['message'];

  @ApiProperty()
  //! @ApiProperty(ReviewApiProperty.Rating)
  @Expose()
  @IsString()
  public rating: Review['rating'];

  @ApiProperty()
  //! @ApiProperty(ReviewApiProperty.CreatedAt)
  @Expose()
  @IsString()
  public createdAt: IBasicReviewRdo['createdAt'];

  @ApiProperty()
  //! @ApiProperty(ReviewApiProperty.CreatedAt)
  @Expose()
  @IsString()
  public userId: Review['userId'];

  @ApiProperty()
  //! @ApiProperty(ReviewApiProperty.CreatedAt)
  @Expose()
  @IsString()
  public user: UserProfileRdo;
}
