import { Role } from '../types/role.enum';

export enum GlobalRoute {
  Api = 'api',
  Swagger = 'spec'
}

export enum ApiServiceRoute {
  Users = 'users',
  Accounts = 'accounts',
  UsersProfiles = 'users-profiles', //! убрать
  Trainings = 'trainings',
  Reviews = 'reviews'
}

export enum ServiceRoute {
  Account = 'auth',
  Questionnaires = 'questionnaires',
  UsersProfiles = 'users-profiles',
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

export enum QuestionnaireRoute {
  LookForCompany = 'look-for-company',
  Files = 'files'
}

export enum TrainingRoute {
  ForSportsman = 'for-sportsman',
  Special = 'special',
  Popular = 'popular'
}

export enum UserProfileRoute {
  Questionnaires = ServiceRoute.Questionnaires,
  QuestionnairesSportsman = `${Questionnaires}/${Role.Sportsman}`,
  QuestionnairesCoach = `${Questionnaires}/${Role.Coach}`,
  Certificates = 'certificates',
  ReadyForTraining = 'ready-for-training',
  LookForCompany = QuestionnaireRoute.LookForCompany
}

export enum FileStorageRoute {
  Upload = 'upload'
}
