import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, Min, IsEnum,
  IsInt, IsOptional, IsString, Max, IsBoolean, MinLength, MaxLength
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { Questionnaire } from '../../interfaces/questionnaire.interface';
import { FILES_PROPERTY, ICreateQuestionnaireCoachDto } from '../../interfaces/dto/i-create-questionnaire-coach.dto';
import { IQuestionnaireRdo } from '../../interfaces/rdo/i-questionnaire.rdo';
import { Specialization } from '../../types/specialization.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { Duration } from '../../types/duration.enum';
import { transformToArray, transformToStringBooleanOrBoolean } from '../../utils/transform';
import { UserApiProperty } from '../../constants/api-property/user.api-property';
import { QuestionnaireApiProperty, QuestionnaireValidation } from '../../constants/api-property/questionnaire.api-property';

export class QuestionnaireApiDoc {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public userId: Questionnaire['userId'];

  @ApiProperty(QuestionnaireApiProperty.Specializations)
  @Expose()
  @IsArray()
  @ArrayUnique() //! нужно ли? может сделать трансформацию одинаковых в один все уникальные значение... @Transform ...
  @ArrayMinSize(QuestionnaireValidation.Specializations.ArrayMinSize)
  @ArrayMaxSize(QuestionnaireValidation.Specializations.ArrayMaxSize)
  @IsString({ each: true })
  @IsEnum(Specialization, { each: true })
  @Transform(transformToArray)
  public specializations: Questionnaire['specializations'];

  @ApiProperty(QuestionnaireApiProperty.TrainingLevel)
  @Expose()
  @IsEnum(TrainingLevel)
  public trainingLevel: Questionnaire['trainingLevel'];

  @ApiProperty(QuestionnaireApiProperty.ReadyForTraining)
  @Expose()
  @IsBoolean()
  public readyForTraining: Questionnaire['readyForTraining'];

  @ApiProperty(QuestionnaireApiProperty.Duration)
  @Expose()
  @IsEnum(Duration)
  public duration: Questionnaire['duration'];

  @ApiProperty(QuestionnaireApiProperty.CaloriesLose)
  @Expose()
  @IsInt()
  @Min(QuestionnaireValidation.CaloriesLose.Min)
  @Max(QuestionnaireValidation.CaloriesLose.Max)
  public caloriesLose: Questionnaire['caloriesLose'];

  @ApiProperty(QuestionnaireApiProperty.CaloriesWaste)
  @Expose()
  @IsInt()
  @Min(QuestionnaireValidation.CaloriesWaste.Min)
  @Max(QuestionnaireValidation.CaloriesWaste.Max)
  public caloriesWaste: Questionnaire['caloriesWaste'];

  @ApiProperty(QuestionnaireApiProperty.Description)
  @Expose()
  @MinLength(QuestionnaireValidation.Description.MinLength)
  @MaxLength(QuestionnaireValidation.Description.MaxLength)
  public description: Questionnaire['description'];

  @ApiProperty(QuestionnaireApiProperty.FileIds)
  @Expose()
  @IsOptional()
  public fileIds: Questionnaire['fileIds'];

  @ApiProperty(QuestionnaireApiProperty.Files)
  @Expose()
  @IsOptional()
  public [FILES_PROPERTY]?: ICreateQuestionnaireCoachDto['files'];

  @ApiProperty(QuestionnaireApiProperty.Certificates)
  @Expose()
  public certificates?: IQuestionnaireRdo['certificates'];

  @ApiProperty(QuestionnaireApiProperty.IndividualTraining)
  @Expose()
  @IsBoolean()
  @Transform(transformToStringBooleanOrBoolean)
  public individualTraining: Questionnaire['individualTraining']; //! что по умолчанию?
}
