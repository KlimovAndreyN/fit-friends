export const AuthenticationApiOperation = {
  Check: { summary: 'Провека токена авторизации' },
  RefreshTokens: { summary: 'Обновление токенов' },
  Login: { summary: 'Авторизация пользователя' },
  Logout: { summary: 'Выход пользователя' },
  Register: { summary: 'Регистрация нового пользователя' },
  Show: { summary: 'Получение информации о пользователе' }
} as const;
