import { Role } from "../types/role.enum";

export enum GlobalRoute {
  Api = 'api',
  Swagger = 'spec'
}

export enum ApiServiceRoute {
  Users = 'users',
  UserProfiles = 'user-profiles',
  Trainings = 'trainings',
  Reviews = 'reviews'
}

export enum ServiceRoute {
  Account = 'auth',
  Questionnaires = 'questionnaires',
  Trainings = 'trainings',
  Orders = 'orders',
  Reviews = 'reviews',
  FileStorage = 'files'
}

export enum AccountRoute {
  Check = 'check',
  Refresh = 'refresh',
  Login = 'login',
  Logout = 'logout',
  Register = 'register'
}

export enum TrainingRoute {
  ForSportsman = 'for-sportsman',
  Special = 'special',
  Popular = 'popular'
}

export enum UserProfileRoute {
  Questionnaire = 'questionnaire',
  QuestionnaireSportsman = `${Questionnaire}/${Role.Sportsman}`,
  QuestionnaireCoach = `${Questionnaire}/${Role.Coach}`,
  ReadyForTraining = 'ready-for-training',
  LookForCompany = 'look-for-company'
}

export enum FileStorageRoute {
  Upload = 'upload'
}
