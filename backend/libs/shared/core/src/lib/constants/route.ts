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
  Questionnaire = 'questionnaire',
  Training = 'training',
  Order = 'order',
  Review = 'review',
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
  Exist = 'exist',
  Questionnaire = 'questionnaire'
}

export enum TrainingRoute {
  ForSportsman = 'for-sportsman',
  Special = 'special',
  Popular = 'popular'
}

export enum UserInfoRoute {
  ReadyForTraining = 'ready-for-training'
}

export enum FileStorageRoute {
  Upload = 'upload'
}
