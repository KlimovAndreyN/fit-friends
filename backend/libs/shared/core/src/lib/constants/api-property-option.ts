export const ApiPropertyOption = {
  Comment: {
    Id: {
      description: 'Comment id',
      example: '2f31b19b-97eb-4305-888a-0b9be7faca8f'
    },
    Message: {
      description: 'Comment message',
      example: 'Comment message, comment message'
    },
    CreatedAt: {
      description: 'Comment date',
      example: '2024-12-27T08:29:40.245Z'
    },
    Entities: {
      description: 'The post comments',
      isArray: true
    }
  }
} as const;
