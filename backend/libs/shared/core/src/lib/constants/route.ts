export enum GlobalRoute {
  Api = 'api',
  Swagger = 'spec'
}

export enum ApiServiceRoute {
  Users = 'users'
}

export enum ServiceRoute {
  Account = 'auth',
  Questionnaire = 'question',
  FileStorage = 'files'
}

export enum AccountRoute {
  Check = 'check',
  Refresh = 'refresh',
  Login = 'login',
  Logout = 'logout',
  Register = 'register'
}

export enum QuestionnaireRoute {
  User = 'user',
  Coach = 'coach'
}

export enum FileStorageRoute {
  Upload = 'upload'
}
