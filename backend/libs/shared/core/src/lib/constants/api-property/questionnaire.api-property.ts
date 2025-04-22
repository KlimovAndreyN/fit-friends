import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { Duration } from '../../types/duration.enum';
import { TrainingLevel } from '../../types/training-level.enum';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export const QuestionnaireApiProperty = {
  Specializations: { //! перепроверить в Swagger когда будет multiFormData
    description: 'The user specializations',
    isArray: true,
    type: 'string',
    //description: 'Specializations - warning! not correct send string[] on swagger!',  //! нужно при swagger fromdata c api
    example: ['boxing'] // ['boxing', 'running'], из swagger-а не коректно передает пример, у значений убирает [] и ""
    //name: 'specializations[]' // не корректная передача string[] через form-data //! нужно при swagger fromdata c api
  },
  TrainingLevel: {
    description: 'The user training level',
    type: 'string',
    enum: TrainingLevel,
    example: TrainingLevel.Amateur
  },
  ReadyForTraining: {
    description: 'ready for training',
    type: 'boolean',
    example: false
  },
  Duration: {
    description: 'The user time',
    type: 'string',
    enum: Duration,
    example: Duration.Minutes_30_50
  },
  CaloriesLose: {
    description: 'The sportsman calories lose',
    type: 'integer',
    example: 1000
  },
  CaloriesWaste: {
    description: 'The sportsman calories waste',
    type: 'integer',
    example: 2000
  },
  Description: {
    description: 'The coach description',
    type: 'string',
    example: 'The coach description'
  },
  FileIds: {
    description: 'The coach fileIds',
    isArray: true,
    example: ['111222333444']
  },
  Files: { //! перепроверить в Swagger когда будет multiFormData
    description: 'The coach files',
    isArray: true,
    type: 'string',
    format: 'binary',
    required: false
  },
  Certificates: {
    description: 'The coach certificates',
    isArray: true
  },
  IndividualTraining: {
    description: 'The coach individual training',
    type: 'boolean',
    example: false
  }
} as const;

export const QuestionnaireValidation = {
  Specializations: {
    ArrayMinSize: 1,
    ArrayMaxSize: 3
  },
  CaloriesLose: {
    Min: 1000,
    Max: 5000
  },
  CaloriesWaste: {
    Min: 1000,
    Max: 5000
  },
  Description: {
    MinLength: 10,
    MaxLength: 140
  },
  Files: {
    Types: ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'],
    MaxSize: 10 * 1024 * 1024
  }
} as const;

export const parseQuestionnaireFilesPipeBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: QuestionnaireValidation.Files.Types.join('|') })
    .addMaxSizeValidator({ maxSize: QuestionnaireValidation.Files.MaxSize })
    .build({
      fileIsRequired: QuestionnaireApiProperty.Files.required,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    });
