import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { ITrainingQuery } from '../interfaces/query/i-training.query';
import { PageQuery } from './page.query';
import { Gender } from '../types/gender.enum';
import { Specialization } from '../types/specialization.enum';
import { Duration } from '../types/duration.enum';
import { TrainingSortType } from '../types/training-sort-type.enum';
import { transformToArray, transformToNumber } from '../utils/transform';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class TrainingQuery
  extends PageQuery
  implements ITrainingQuery {
  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformToNumber) // трансформ срабатывает раньше @IsInt()
  public priceMin?: ITrainingQuery['priceMin'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformToNumber)
  public priceMax?: ITrainingQuery['priceMax'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformToNumber)
  public caloriesWasteMin?: ITrainingQuery['caloriesWasteMin'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformToNumber)
  public caloriesWasteMax?: ITrainingQuery['caloriesWasteMax'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformToNumber)
  public ratingMin?: ITrainingQuery['ratingMin'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformToNumber)
  public ratingMax?: ITrainingQuery['ratingMax'];

  @ApiProperty({
    isArray: true,
    type: 'string',
    enum: Specialization,
    example: [Specialization.Aerobics, Specialization.Boxing],
    required: false
  })
  @IsEnum(Specialization, { each: true })
  @IsOptional()
  @Transform(transformToArray)
  public specializations?: ITrainingQuery['specializations'];

  @ApiProperty({
    type: 'string',
    enum: Gender,
    example: Gender.Male,
    required: false
  })
  @IsEnum(Gender)
  @IsOptional()
  public gender?: ITrainingQuery['gender'];

  @ApiProperty({
    isArray: true,
    type: 'string',
    enum: Duration,
    example: [Duration.Minutes_10_30, Duration.Minutes_80_100],
    required: false
  })
  @IsEnum(Duration, { each: true })
  @IsOptional()
  @Transform(transformToArray)
  public durations?: ITrainingQuery['durations'];

  @ApiProperty({
    type: 'string',
    enum: TrainingSortType,
    example: TrainingSortType.LowPrice,
    required: false
  })
  @IsEnum(TrainingSortType)
  @IsOptional()
  public sortType?: ITrainingQuery['sortType'];

  @ApiProperty({
    type: 'string',
    example: UserApiProperty.Id.example, //! добавить бы SwaggerCoachId.... но еще нету
    required: false
  })
  @IsString()
  @IsOptional()
  public coachId?: ITrainingQuery['coachId'];
}
