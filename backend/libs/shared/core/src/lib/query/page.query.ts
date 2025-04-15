import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { IPageQuery } from '../interfaces/query/i-page.query';
import { PageQueryApiProperty } from '../constants/page-query-api-property';

const DEFAULT_PAGE = 1;

export class PageQuery
  implements IPageQuery {
  @ApiProperty(PageQueryApiProperty)
  @IsInt()
  @Transform(({ value }) => +value || DEFAULT_PAGE)
  @IsOptional()
  public page: number = DEFAULT_PAGE;
}
