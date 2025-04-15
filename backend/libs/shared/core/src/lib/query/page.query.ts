import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { IPageQuery } from '../interfaces/query/i-page.query';
import { transformNumber } from '../utils/transform';

export class PageQuery
  implements IPageQuery {
  @ApiProperty({
    description: 'The page',
    required: false
  })
  @IsInt()
  @IsOptional()
  @Transform(transformNumber)
  public page: number;
}
