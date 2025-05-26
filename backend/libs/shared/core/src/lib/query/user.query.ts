import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { IUserQuery } from '../interfaces/query/i-user.query';
import { PageQuery } from './page.query';
import { Location } from '../types/location.enum';
import { Specialization } from '../types/specialization.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { UserSortType } from '../types/user-sort-type.enum';
import { transformToArray } from '../utils/transform';

export class UserQuery
  extends PageQuery
  implements IUserQuery {
  @ApiProperty({
    isArray: true,
    type: 'string',
    enum: Location,
    example: [Location.Petrogradskaya, Location.Pionerskaya],
    required: false
  })
  @IsEnum(Location, { each: true })
  @IsOptional()
  @Transform(transformToArray)
  public locations?: IUserQuery['locations'];

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
  public specializations?: IUserQuery['specializations'];

  @ApiProperty({
    type: 'string',
    enum: TrainingLevel,
    required: false
  })
  @IsEnum(TrainingLevel)
  @IsOptional()
  public level?: IUserQuery['level'];

  @ApiProperty({
    type: 'string',
    enum: UserSortType,
    example: UserSortType.OnlyCoach,
    required: false
  })
  @IsEnum(UserSortType)
  @IsOptional()
  public sortType?: IUserQuery['sortType'];
}
