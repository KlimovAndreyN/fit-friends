import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { IUserProfileQuery } from '../interfaces/query/i-user-profile.query';
import { PageQuery } from './page.query';
import { Location } from '../types/location.enum';
import { Specialization } from '../types/specialization.enum';
import { TrainingLevel } from '../types/training-level.enum';
import { UserSortType } from '../types/user-sort-type.enum';
import { transformToArray } from '../utils/transform';

export class UserProfileQuery
  extends PageQuery
  implements IUserProfileQuery {
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
  public locations?: IUserProfileQuery['locations'];

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
  public specializations?: IUserProfileQuery['specializations'];

  @ApiProperty({
    type: 'string',
    enum: TrainingLevel,
    required: false
  })
  @IsEnum(TrainingLevel)
  @IsOptional()
  public trainingLevel?: IUserProfileQuery['trainingLevel'];

  @ApiProperty({
    type: 'string',
    enum: UserSortType,
    example: UserSortType.OnlyCoach,
    required: false
  })
  @IsEnum(UserSortType)
  @IsOptional()
  public sortType?: IUserProfileQuery['sortType'];
}
