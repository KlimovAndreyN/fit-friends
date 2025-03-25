import { Duration } from '../../types/duration.enum';
import { UserLevel } from '../../types/user-level.enum';

//! типизировать через ApiPropertyCommonOptions, а потом собрать в общий обьект
export const QuestionnaireApiProperty = {
  Specializations: {
    description: 'The user specializations',
    //description: 'Specializations - warning! not correct send string[] on swagger!',  //! нужно при swagger fromdata c api
    example: ['boxing'], // ['boxing', 'running'], из swagger-а не коректно передает пример, у значений убирает [] и ""
    //name: 'specializations[]', // не корректная передача string[] через form-data //! нужно при swagger fromdata c api
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
    description: 'The user calories lose',
    type: 'integer',
    example: 1000
  },
  CaloriesWaste: {
    description: 'The user  calories waste',
    type: 'integer',
    example: 2000
  }
} as const;
