import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';

export enum UserProp {
  Password = 'password',
  AvatarFileId = 'avatarFileId',
  AvatarFile = 'avatarFile',
  AvatarSrc = 'avatarSrc',
  MetroStationName = 'metroStationName',
  BackgroundPath = 'backgroundPath',
  Gender = 'gender',
  Role = 'role',
  CreatedAt = 'createdAt',
  ExistQuestionnaire = 'existQuestionnaire',
  RegistrationDate = 'registrationDate'
}

export interface User {
  id?: string;
  name: string;
  email: string;
  birthday?: Date;
  [UserProp.MetroStationName]: MetroStationName;
  [UserProp.BackgroundPath]: string;
  [UserProp.Gender]: UserGender;
  [UserProp.Role]: UserRole;
  [UserProp.AvatarFileId]?: string;
  [UserProp.ExistQuestionnaire]: boolean;
  [UserProp.CreatedAt]?: Date;
}
