export const AuthenticationApiOperation = {
  Register: { summary: 'Регистрация нового пользователя' },
  Login: { summary: 'Авторизация пользователя' },
  Logout: { summary: 'Выход пользователя' },
  RefreshTokens: { summary: 'Обновление токенов' },
  Check: { summary: 'Провека токена авторизации' },
  Show: { summary: 'Получение информации о пользователе' }
} as const;
