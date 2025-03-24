import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';

import { Questionnaire } from '../interfaces/questionnaire.interface';
import { ICreateQuestionnaireDto } from '../interfaces/dto/i-create-questionnaire.dto';
import { Specialization } from '../types/specialization.enum';
import { UserLevel } from '../types/user-level.enum';
import { Duration } from '../types/duration.enum';
import { UserRole } from '../types/user-role.enum';
import { QuestionnaireApiProperty } from '../constants/api-property/questionnaire.api-property';
import { QuestionnaireValidation } from '../constants/authentication.constant';
import { UserApiProperty } from '../constants/api-property/user.api-property';

//! название и размещение не очень... используется для описания, валидации и трансформации dto и rdo
//! иногда разное описание например дата рождения, в dto и кратное и полное, а rdo только полное
// QuestionnaireApiDoc
export class BaseQuestionnaireDto {
  @ApiProperty(QuestionnaireApiProperty.Id)
  @Expose()
  public id: Questionnaire['id'];

  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public userId: Questionnaire['userId'];

  @ApiProperty(UserApiProperty.Role)
  @IsEnum(UserRole)
  public userRole: UserRole;

  @ApiProperty(QuestionnaireApiProperty.Specialisations)
  @Expose()
  @IsArray()
  @ArrayMaxSize(Object.values(Specialization).length)
  @IsString({ each: true })
  @IsEnum(Specialization, { each: true })
  specializations: Questionnaire['specializations'];

  @ApiProperty(QuestionnaireApiProperty.Level)
  @Expose()
  @IsEnum(UserLevel)
  level: UserLevel;

  @ApiProperty(QuestionnaireApiProperty.Time)
  @Expose()
  @IsEnum(Duration)
  @IsOptional() //!
  time: Duration;

  @ApiProperty(QuestionnaireApiProperty.CaloriesLose)
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(QuestionnaireValidation.CaloriesLose.Min)
  @Max(QuestionnaireValidation.CaloriesLose.Max)
  @IsOptional() //!
  caloriesLose: number;

  @ApiProperty(QuestionnaireApiProperty.CaloriesWaste)
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(QuestionnaireValidation.CaloriesWaste.Min)
  @Max(QuestionnaireValidation.CaloriesWaste.Max)
  @IsOptional() //!
  caloriesWaste: number;

  //! еще будут данные от опросника тренера
  @IsOptional() //!
  description: Questionnaire['description']

  @IsOptional() //!
  fileIds: Questionnaire['fileIds']

  @IsOptional() //!
  files: ICreateQuestionnaireDto['files']

  @IsOptional() //!
  individualTraining: Questionnaire['individualTraining']
}
