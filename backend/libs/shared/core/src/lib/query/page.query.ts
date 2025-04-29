import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { IPageQuery } from '../interfaces/query/i-page.query';
import { transformNumber } from '../utils/transform';
import { PageQueryValidation } from '../constants/api-property/page-api-property';

export class PageQuery
  implements IPageQuery {
  @ApiProperty({
    description: 'The page',
    type: 'integer',
    required: false
  })
  @IsInt()
  @Min(PageQueryValidation.Page.Min)
  @IsOptional()
  @Transform(transformNumber)
  public page?: IPageQuery['page'];

  @ApiProperty({
    description: 'The limit',
    type: 'integer',
    required: false
  })
  @IsInt()
  @Min(PageQueryValidation.Limit.Min)
  @Max(PageQueryValidation.Limit.Max)
  @IsOptional()
  @Transform(transformNumber)
  public limit?: IPageQuery['limit'];
}
