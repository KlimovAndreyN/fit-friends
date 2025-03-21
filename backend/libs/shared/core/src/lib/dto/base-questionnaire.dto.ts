import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { Questionnaire } from '../interfaces/questionnaire.interface';
import { Specialisation } from '../types/specialisation.enum';
import { UserLevel } from '../types/user-level.enum';
import { Duration } from '../types/duration.enum';
import { ICreateQuestionnaireUserDto } from '../interfaces/dto/i-create-questionnaire-user.dto';
import { QuestionnaireApiProperty } from '../constants/api-property/questionnaire.api-property';

//! название и размещение не очень... используется для описания, валидации и трансформации dto и rdo
//! иногда разное описание например дата рождения, в dto и кратное и полное, а rdo только полное
// QuestionnaireApiDoc
export class BaseQuestionnaireDto {
  @ApiProperty(QuestionnaireApiProperty.Id)
  @Expose()
  public id: Questionnaire['id'];

  @ApiProperty(QuestionnaireApiProperty.Specialisations)
  @Expose()
  @IsArray()
  @ArrayMaxSize(Object.values(Specialisation).length)
  @IsString({ each: true })
  @IsEnum(Specialisation, { each: true })
  specialisations: ICreateQuestionnaireUserDto['specialisations'];

  @ApiProperty()
  @Expose()
  @IsEnum(UserLevel)
  level: UserLevel;

  @ApiProperty()
  @Expose()
  @IsEnum(Duration)
  time: Duration;

  @ApiProperty()
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  caloriesLose: number;

  @ApiProperty()
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  caloriesWaste: number;
}
