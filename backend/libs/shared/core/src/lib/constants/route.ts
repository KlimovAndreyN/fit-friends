export enum GlobalRoute {
  Api = 'api',
  Swagger = 'spec'
}

export enum ApiServiceRoute {
  Users = 'users',
  FitQuestionnaires = 'fit-questions',
  UserInfo = 'user-info'
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

//! пригодился?
export enum ApiRoute {
  //GetUserInfo = 'get-user-info'
}

export enum FileStorageRoute {
  Upload = 'upload'
}
