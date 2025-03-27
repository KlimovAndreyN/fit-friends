import { Duration } from '../../types/duration.enum';
import { UserLevel } from '../../types/user-level.enum';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export const QuestionnaireApiProperty = {
  Specializations: { //! перепроверить в Swagger когда будет multiFormData
    description: 'The user specializations',
    isArray: true,
    //description: 'Specializations - warning! not correct send string[] on swagger!',  //! нужно при swagger fromdata c api
    example: ['boxing'] // ['boxing', 'running'], из swagger-а не коректно передает пример, у значений убирает [] и ""
    //name: 'specializations[]' // не корректная передача string[] через form-data //! нужно при swagger fromdata c api
  },
  Level: {
    description: 'The user level',
    type: 'string',
    enum: UserLevel,
    example: UserLevel.Amateur
  },
  ReadyForTraining: {
    description: 'ready for training',
    type: 'boolean',
    example: false
  },
  Time: {
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
  FileIds: { //! перепроверить в Swagger когда будет multiFormData
    description: 'The coach fileIds',
    isArray: true,
    example: ['111222333444']
  },
  Files: {//! перепроверить в Swagger когда будет multiFormData
    description: 'The coach files',
    isArray: true,
    type: 'string',
    format: 'binary',
    required: false
  },
  FilePaths: {//! перепроверить в Swagger когда будет multiFormData
    description: 'The coach files paths',
    isArray: true,
    type: 'string',
    example: ['/some/file']
  },
  IndividualTraining: {
    description: 'The coach individual training',
    type: 'boolean',
    example: false
  }
} as const;
