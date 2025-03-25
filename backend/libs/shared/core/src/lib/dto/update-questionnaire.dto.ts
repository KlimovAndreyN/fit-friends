import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsOptional } from 'class-validator';

import { Questionnaire } from '../interfaces/questionnaire.interface';
import { IUpdateQuestionnaireDto } from '../interfaces/dto/i-update-questionnaire.dto';
import { Specialization } from '../types/specialization.enum';
import { UserLevel } from '../types/user-level.enum';
import { QuestionnaireApiProperty } from '../constants/api-property/questionnaire.api-property';

//! если будут файл для тренера, то сделать UpdateQuestionnaireWithFileIdsDto, а здесь исключить id файлов и добавить пути к файлам
export class UpdateQuestionnaireDto implements IUpdateQuestionnaireDto {
  @ApiProperty(QuestionnaireApiProperty.Specializations)
  @IsArray()
  @ArrayMaxSize(Object.values(Specialization).length)
  @IsEnum(Specialization, { each: true })
  @IsOptional()
  specializations?: Questionnaire['specializations'];

  @ApiProperty(QuestionnaireApiProperty.Level)
  @IsEnum(UserLevel)
  @IsOptional()
  level?: Questionnaire['level'];

  @ApiProperty(QuestionnaireApiProperty.ReadyForTraining)
  @IsBoolean()
  @IsOptional()
  readyForTraining?: Questionnaire['readyForTraining'];
}
