import { Duration } from '../../types/duration.enum';
import { UserLevel } from '../../types/user-level.enum';

export const QuestionnaireApiProperty = {
  Id: {
    description: 'Questionnaire ID',
    example: '658170cbb954e9f50000ccf4',
    type: 'string'
  },
  Specialisations: {
    description: 'The user specializations',
    //description: 'Specialisations - warning! not correct send string[] on swagger!',  //! нужно при swagger fromdata c api
    example: ['boxing'], // ['boxing', 'running'], из swagger-а не коректно передает пример, у значений убирает [] и ""
    //name: 'specializations[]', // не корректная передача string[] через form-data //! нужно при swagger fromdata c api
  },
  Level: {
    description: 'The user level',
    type: 'string',
    enum: UserLevel,
    example: UserLevel.Amateur
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
