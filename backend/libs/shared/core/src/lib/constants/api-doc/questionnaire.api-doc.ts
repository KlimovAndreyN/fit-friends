import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';

import { User } from '../../interfaces/user.interface';
import { Questionnaire } from '../../interfaces/questionnaire.interface';
import { ICreateQuestionnaireDto } from '../../interfaces/dto/i-create-questionnaire.dto';
import { Specialization } from '../../types/specialization.enum';
import { UserLevel } from '../../types/user-level.enum';
import { Duration } from '../../types/duration.enum';
import { UserRole } from '../../types/user-role.enum';
import { QuestionnaireApiProperty } from '../../constants/api-property/questionnaire.api-property';
import { QuestionnaireValidation } from '../../constants/authentication.constant';
import { UserApiProperty } from '../../constants/api-property/user.api-property';

export class QuestionnaireApiDoc {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public userId: Questionnaire['userId'];

  @ApiProperty(UserApiProperty.Role)
  @IsEnum(UserRole)
  public userRole: User['role'];

  @ApiProperty(QuestionnaireApiProperty.Specializations)
  @Expose()
  @IsArray()
  @ArrayMaxSize(Object.values(Specialization).length) //! нужно ли, может условие, что каждая один раз или потом забрать все уникальные значение
  @IsString({ each: true })
  @IsEnum(Specialization, { each: true })
  specializations: Questionnaire['specializations'];

  @ApiProperty(QuestionnaireApiProperty.Level)
  @Expose()
  @IsEnum(UserLevel)
  level: Questionnaire['level'];

  @ApiProperty(QuestionnaireApiProperty.ReadyForTraining)
  @Expose()
  @IsBoolean()
  @IsOptional()
  readyForTraining: Questionnaire['readyForTraining'];

  @ApiProperty(QuestionnaireApiProperty.Time)
  @Expose()
  @IsEnum(Duration)
  @IsOptional()
  time: Questionnaire['time'];

  @ApiProperty(QuestionnaireApiProperty.CaloriesLose)
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(QuestionnaireValidation.CaloriesLose.Min)
  @Max(QuestionnaireValidation.CaloriesLose.Max)
  @IsOptional()
  caloriesLose: Questionnaire['caloriesLose'];

  @ApiProperty(QuestionnaireApiProperty.CaloriesWaste)
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(QuestionnaireValidation.CaloriesWaste.Min)
  @Max(QuestionnaireValidation.CaloriesWaste.Max)
  @IsOptional()
  caloriesWaste: Questionnaire['caloriesWaste'];

  @ApiProperty(QuestionnaireApiProperty.Description)
  @Expose()
  @IsOptional()
  description: Questionnaire['description']; //! ограничения есть в ТЗ?

  @ApiProperty(QuestionnaireApiProperty.FileIds)
  @Expose()
  @IsOptional()
  fileIds: Questionnaire['fileIds']; //! ограничения есть в ТЗ?

  @ApiProperty(QuestionnaireApiProperty.Files)
  @Expose()
  @IsOptional()
  files: ICreateQuestionnaireDto['files']; //! ограничения есть в ТЗ?

  //! filePaths ?

  @ApiProperty(QuestionnaireApiProperty.IndividualTraining)
  @Expose()
  @IsBoolean()
  @IsOptional()
  individualTraining: Questionnaire['individualTraining']; //! ограничения есть в ТЗ? //! что по умолчанию?
}
