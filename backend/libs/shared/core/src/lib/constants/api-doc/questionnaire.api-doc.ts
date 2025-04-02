import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, Min,
  IsEnum, IsNumber, IsOptional, IsString, Max, IsBoolean
} from 'class-validator';
import { Expose } from 'class-transformer';

import { Questionnaire } from '../../interfaces/questionnaire.interface';
import { ICreateQuestionnaireCoachDto } from '../../interfaces/dto/i-create-questionnaire-coach.dto';
import { IQuestionnaireRdo } from '../../interfaces/rdo/i-questionnaire.rdo';
import { Specialization } from '../../types/specialization.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { Duration } from '../../types/duration.enum';
import { QuestionnaireApiProperty } from '../../constants/api-property/questionnaire.api-property';
import { QuestionnaireValidation } from '../../constants/authentication.constant';
import { UserApiProperty } from '../../constants/api-property/user.api-property';

export class QuestionnaireApiDoc {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public userId: Questionnaire['userId'];

  @ApiProperty(QuestionnaireApiProperty.Specializations)
  @Expose()
  @IsArray()
  @ArrayUnique()//! нужно ли? может сделать трансформацию одинаковых в один все уникальные значение... @Transform ...
  @ArrayMinSize(QuestionnaireValidation.Specializations.ArrayMinSize)
  @ArrayMaxSize(QuestionnaireValidation.Specializations.ArrayMaxSize)
  @IsString({ each: true })
  @IsEnum(Specialization, { each: true })
  specializations: Questionnaire['specializations'];

  @ApiProperty(QuestionnaireApiProperty.Level)
  @Expose()
  @IsEnum(TrainingLevel)
  trainingLevel: Questionnaire['trainingLevel'];

  @ApiProperty(QuestionnaireApiProperty.ReadyForTraining)
  @Expose()
  @IsBoolean()
  readyForTraining: Questionnaire['readyForTraining'];

  @ApiProperty(QuestionnaireApiProperty.Time)
  @Expose()
  @IsEnum(Duration)
  time: Questionnaire['time'];

  @ApiProperty(QuestionnaireApiProperty.CaloriesLose)
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(QuestionnaireValidation.CaloriesLose.Min)
  @Max(QuestionnaireValidation.CaloriesLose.Max)
  caloriesLose: Questionnaire['caloriesLose'];

  @ApiProperty(QuestionnaireApiProperty.CaloriesWaste)
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(QuestionnaireValidation.CaloriesWaste.Min)
  @Max(QuestionnaireValidation.CaloriesWaste.Max)
  caloriesWaste: Questionnaire['caloriesWaste'];

  @ApiProperty(QuestionnaireApiProperty.Description)
  @Expose()
  description: Questionnaire['description']; //! ограничения есть в ТЗ?

  @ApiProperty(QuestionnaireApiProperty.FileIds)
  @Expose()
  fileIds: Questionnaire['fileIds']; //! ограничения есть в ТЗ?

  @ApiProperty(QuestionnaireApiProperty.Files)
  @Expose()
  @IsOptional()
  files?: ICreateQuestionnaireCoachDto['files']; //! ограничения есть в ТЗ?

  @ApiProperty(QuestionnaireApiProperty.FilePaths)
  @Expose()
  filePaths: IQuestionnaireRdo['filePaths'];

  @ApiProperty(QuestionnaireApiProperty.IndividualTraining)
  @Expose()
  @IsBoolean()
  individualTraining: Questionnaire['individualTraining']; //! ограничения есть в ТЗ? //! что по умолчанию?
}
