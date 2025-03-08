export const ApiOperationOption = {
  User: {
    Register: { summary: 'Регистрация нового пользователя' },
    Login: { summary: 'Авторизация пользователя' },
    Logout: { summary: 'Выход пользователя' },
    RefreshTokens: { summary: 'Обновление токенов' },
    Check: { summary: 'Провека токена авторизации' },
    ChangePassword: { summary: 'Провека токена авторизации' },
    Show: { summary: 'Получение информации о пользователе' },
    ShowDetail: { summary: 'Получение детальной информации о пользователе' }
  },
  Comment: {
    Index: { summary: 'Получение списка комментариев' },
    Add: { summary: 'Добавление комментария' },
    Delete: { summary: 'Удаление комментария' }
  }
} as const;
