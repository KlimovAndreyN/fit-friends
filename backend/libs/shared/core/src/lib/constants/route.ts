export enum GlobalRoute {
  Api = 'api',
  Swagger = 'spec'
}

export enum ApiServiceRoute {
  Users = 'users',
  FitQuestionnaires = 'fit-questions'
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
  Exist = 'exist'
}

export enum ApiRoute {
  GetUserInfo = 'get-user-info'
}

export enum FileStorageRoute {
  Upload = 'upload'
}
