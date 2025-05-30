import { Role } from '../types/role.enum';

export enum GlobalRoute {
  Api = 'api',
  Swagger = 'spec'
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

export enum ApiServiceRoute {
  Users = 'users', //! может все будет в UsersProfiles?
  Accounts = 'accounts',
  UsersProfiles = ServiceRoute.UsersProfiles,
  Trainings = ServiceRoute.Trainings,
  Reviews = ServiceRoute.Reviews
}

export enum AccountRoute {
  Check = 'check',
  Refresh = 'refresh',
  Login = 'login',
  Logout = 'logout',
  Register = 'register'
}

export enum QuestionnaireRoute {
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
  LookForCompany = 'look-for-company'
}

export enum FileStorageRoute {
  Upload = 'upload'
}
