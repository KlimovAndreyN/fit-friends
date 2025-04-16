import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { ITrainingQuery } from '../interfaces/query/i-training.query';
import { PageQuery } from './page.query';
import { SortType } from '../types/sort-type.enum';
import { Specialization } from '../types/specialization.enum';
import { transformArray, transformNumber } from '../utils/transform';

export class TrainingQuery
  extends PageQuery
  implements ITrainingQuery {
  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformNumber) // трансформ срабатывает раньше @IsInt()
  public priceMin?: ITrainingQuery['priceMin'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformNumber)
  public priceMax?: ITrainingQuery['priceMax'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformNumber)
  public caloriesWasteMin?: ITrainingQuery['caloriesWasteMin'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformNumber)
  public caloriesWasteMax?: ITrainingQuery['caloriesWasteMax'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformNumber)
  public ratingMin?: ITrainingQuery['ratingMin'];

  @ApiProperty({
    type: 'integer',
    required: false
  })
  @IsOptional()
  @Transform(transformNumber)
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
  @Transform(transformArray<Specialization>)
  public specializations?: ITrainingQuery['specializations'];

  @ApiProperty({
    type: 'string',
    enum: SortType,
    example: SortType.LowPrice,
    required: false
  })
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: ITrainingQuery['sortType'];
}
