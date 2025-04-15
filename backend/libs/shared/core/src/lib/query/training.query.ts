import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { ITrainingQuery } from '../interfaces/query/i-training.query';
import { PageQuery } from './page.query';
import { SortType } from '../types/sort-type.enum';
import { Specialization } from '../types/specialization.enum';

export class TrainingQuery
  extends PageQuery
  implements ITrainingQuery {
  @ApiProperty(/*TrainingQueryApiProperty....*/) //! тут сделать описание!
  @IsInt()
  @IsOptional()
  public priceMin?: ITrainingQuery['priceMin'];

  @ApiProperty(/*TrainingQueryApiProperty....*/{ isArray: true }) //! тут сделать описание!
  @IsEnum(Specialization, { each: true })
  @IsOptional()
  public specializations?: ITrainingQuery['specializations'];

  @ApiProperty(/*TrainingQueryApiProperty.SortType*/) //! тут сделать описание!
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: ITrainingQuery['sortType']/* = Default.SORT_TYPE*/; //! тут сделать описание!
}
