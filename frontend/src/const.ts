import {
  Duration, Location, Specialization, AccountRoute,
  TrainingLevel, ApiServiceRoute, Gender, Role
} from '@backend/shared/core';
import { convertEnumToArray, joinUrl } from '@backend/shared/helpers';

import { Option } from './types/types';

export const MAIN_TITLE = 'FitFriends';
export const ID_PARAM = ':id';
export const REVIEWS_ANCHOR = 'reviews';

export const LOADING_TEXT = 'Загрузка...';

export enum PageTitle {
  Index = MAIN_TITLE,
  Loading = LOADING_TEXT,
  Intro = 'Разводящая',
  SignIn = 'Войти',
  SignUp = 'Регистрация',
  Questionnaire = 'Опросник',
  PersonalAccount = 'Личный кабинет',
  TrainingsCatalog = 'Каталог тренировок',
  TrainingDetail = 'Карточка тренировки',
  CreateTraining = 'Создать тренировку',
  UsersCatalog = 'Каталог пользователей',
  UserDetail = 'Карточка пользователя',
  Friends = 'Список друзей',
  MyPurchases = 'Мои покупки',
  MyOrders = 'Мои заказы',
  MyTrainings = 'Мои тренировки',
  NotFound = '404'
}

export enum AppRoute {
  Index = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Questionnaire = '/questionnaire',
  PersonalAccount = '/personal-account',
  TrainingsCatalog = '/trainings',
  TrainingDetail = `/training/${ID_PARAM}`,
  CreateTraining = '/create-training',
  UsersCatalog = '/users',
  UserDetail = `/user/${ID_PARAM}`,
  Friends = '/friends',
  MyPurchases = '/my-purchases',
  MyOrders = '/my-orders',
  MyTrainings = '/my-trainings',
  NotFound = '/404'
}

export const ApiRoute = {
  LOGIN: joinUrl(ApiServiceRoute.Users, AccountRoute.Login),
  LOGOUT: joinUrl(ApiServiceRoute.Users, AccountRoute.Logout),
  REFRESH: joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh),
  CHECK: joinUrl(ApiServiceRoute.Users, AccountRoute.Check),
  REGISTER: joinUrl(ApiServiceRoute.Users, AccountRoute.Register)
} as const;

export enum StoreSlice {
  UserProcess = 'USER_PROCESS',
  AccountProcess = 'ACCOUNT_PROCESS',
  UserProfileProcess = 'USER_PROFILE_PROCESS',
  TrainingProcess = 'TRAINING_PROCESS',
  ReviewProcess = 'REVIEW_PROCESS'
}

export const DefaultUser = {
  ROLE: Role.Coach,
  GENDER: Gender.Female,
  SPECIALISATIONS: [
    Specialization.Boxing,
    Specialization.Crossfit,
    Specialization.Power
  ],
  DURATION: Duration.Minutes_30_50,
  TRAINING_LEVEL: TrainingLevel.Amateur
} as const;

const UserGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'Женский',
  [Gender.Male]: 'Мужской',
  [Gender.NotMatter]: 'Неважно',
} as const;

export const USER_GENDERS: Option[] = convertEnumToArray(Gender).map(
  (gender) => ({ value: gender, title: UserGenderTitle[gender] })
);

export const TrainingGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'женщин',
  [Gender.Male]: 'мужчин',
  [Gender.NotMatter]: 'всех',
} as const;

const CreateTrainingGenderTitle: { [key in Gender]: string } = {
  [Gender.Female]: 'Женщинам',
  [Gender.Male]: 'Мужчинам',
  [Gender.NotMatter]: 'Всем',
} as const;

export const TRAINING_GENDERS: Option[] = convertEnumToArray(Gender).map(
  (gender) => ({ value: gender, title: CreateTrainingGenderTitle[gender] })
);

export const LocationTitle: { [key in Location]: string } = {
  [Location.Petrogradskaya]: 'Петроградская',
  [Location.Pionerskaya]: 'Пионерская',
  [Location.Sportivnaya]: 'Спортивная',
  [Location.Udelnaya]: 'Удельная',
  [Location.Zvezdnaya]: 'Звёздная'
} as const;

export const LOCATIONS: Option[] = convertEnumToArray(Location).map(
  (location) => ({ value: location, title: LocationTitle[location] })
);

export const SpecializationTitle: { [key in Specialization]: string } = {
  [Specialization.Aerobics]: 'Аэробика',
  [Specialization.Running]: 'Бег',
  [Specialization.Boxing]: 'Бокс',
  [Specialization.Yoga]: 'Йога',
  [Specialization.Crossfit]: 'Кроссфит',
  [Specialization.Pilates]: 'Пилатес',
  [Specialization.Power]: 'Силовые',
  [Specialization.Stretching]: 'Стрейчинг'
} as const;

export const SPECIALISATIONS: Option[] = convertEnumToArray(Specialization).map(
  (specialization) => ({ value: specialization, title: SpecializationTitle[specialization] })
);

export const DurationMinMax: { [key in Duration]: { min: number; max: number } } = {
  [Duration.Minutes_10_30]: { min: 10, max: 30 },
  [Duration.Minutes_30_50]: { min: 30, max: 50 },
  [Duration.Minutes_50_80]: { min: 50, max: 80 },
  [Duration.Minutes_80_100]: { min: 80, max: 100 }
} as const;


export const DURATIONS: Option[] = convertEnumToArray(Duration).map(
  (duration) => ({ value: duration, title: `${DurationMinMax[duration].min}-${DurationMinMax[duration].max} мин` })
);

export const TRAINIG_FILTER_DURATIONS: Option[] = convertEnumToArray(Duration).map(
  (duration) => ({ value: duration, title: `${DurationMinMax[duration].min} мин - ${DurationMinMax[duration].max} мин` })
);

const TrainingLevelTitle: { [key in TrainingLevel]: string } = {
  [TrainingLevel.Amateur]: 'Любитель',
  [TrainingLevel.Beginner]: 'Новичок',
  [TrainingLevel.Professional]: 'Профессионал'
} as const;

export const TRAINING_LEVELS: Option[] = convertEnumToArray(TrainingLevel).map(
  (trainingLevel) => ({ value: trainingLevel, title: TrainingLevelTitle[trainingLevel] })
);

export const CERTIFICATES_FILE_TYPES = '.pdf, .jpg, .jpeg, .png';

//! временно здесь
export enum TrainingRequestStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected'
}

export function isPendingTrainingRequestStatus(status?: TrainingRequestStatus) {
  return (status === TrainingRequestStatus.Pending);
}

export function isAcceptedTrainingRequestStatus(status?: TrainingRequestStatus) {
  return (status === TrainingRequestStatus.Accepted);
}

export function isRejectedTrainingRequestStatus(status?: TrainingRequestStatus) {
  return (status === TrainingRequestStatus.Rejected);
}

export type Friend = {
  id: string;
  name: string;
  avatarFilePath: string;
  role: Role;
  location: Location;
  readyForTraning: boolean;
  specializations: Specialization[];
  myJointTrainingStatus?: TrainingRequestStatus;
  forMyJointTrainingStatus?: TrainingRequestStatus;
  personalTrainingStatus?: TrainingRequestStatus;
}

export const MOCK_FRIENDS: Friend[] = [
  {
    id: '01',
    name: 'Елизавета',
    avatarFilePath: '',
    role: Role.Sportsman,
    location: Location.Petrogradskaya,
    readyForTraning: true,
    specializations: [Specialization.Aerobics, Specialization.Boxing, Specialization.Crossfit],
    myJointTrainingStatus: undefined,
    forMyJointTrainingStatus: undefined,
    personalTrainingStatus: undefined
  },
  {
    id: '02',
    name: 'Татьяна',
    avatarFilePath: 'img/content/thumbnails/friend-04.jpg',
    role: Role.Coach,
    location: Location.Pionerskaya,
    readyForTraning: false,
    specializations: [Specialization.Pilates, Specialization.Power],
    myJointTrainingStatus: TrainingRequestStatus.Pending,
    forMyJointTrainingStatus: TrainingRequestStatus.Pending,
    personalTrainingStatus: TrainingRequestStatus.Pending
  },
  {
    id: '03',
    name: 'Ксения',
    avatarFilePath: 'img/content/thumbnails/friend-07.jpg',
    role: Role.Sportsman,
    location: Location.Udelnaya,
    readyForTraning: false,
    specializations: [Specialization.Running, Specialization.Stretching],
    myJointTrainingStatus: TrainingRequestStatus.Rejected,
    forMyJointTrainingStatus: TrainingRequestStatus.Rejected,
    personalTrainingStatus: TrainingRequestStatus.Rejected
  },
  {
    id: '04',
    name: 'Ева',
    avatarFilePath: 'img/content/thumbnails/friend-10.jpg',
    role: Role.Sportsman,
    location: Location.Zvezdnaya,
    readyForTraning: true,
    specializations: [Specialization.Yoga],
    myJointTrainingStatus: TrainingRequestStatus.Accepted,
    forMyJointTrainingStatus: TrainingRequestStatus.Accepted,
    personalTrainingStatus: TrainingRequestStatus.Accepted
  }
];
