export const QuestionnaireApiProperty = {
  Id: {
    description: 'Questionnaire ID',
    example: '658170cbb954e9f50000ccf4',
    type: 'string'
  },
  Specialisations: {
    description: 'Specialisations - warning! not correct send string[] on swagger!',
    example: ['boxing'], // ['boxing', 'running'], из swagger-а не коректно передает пример, у значений убирает [] и ""
    name: 'specialisations[]', // не корректная передача string[] через form-data
  }
} as const;
