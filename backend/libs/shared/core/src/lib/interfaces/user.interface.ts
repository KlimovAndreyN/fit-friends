import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';

export enum UserProp {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  Password = 'password',
  AvatarFileId = 'avatarFileId',
  AvatarFile = 'avatarFile',
  Birthday = 'birthday',
  MetroStationName = 'metroStationName',
  BackgroundPath = 'backgroundPath',
  Gender = 'gender',
  Role = 'role',
  CreatedAt = 'createdAt'
}

export interface User {
  [UserProp.Id]?: string;
  [UserProp.Name]: string;
  [UserProp.Email]: string;
  [UserProp.Birthday]?: Date;
  [UserProp.MetroStationName]: MetroStationName;
  [UserProp.BackgroundPath]: string;
  [UserProp.Gender]: UserGender;
  [UserProp.Role]: UserRole;
  [UserProp.AvatarFileId]?: string;
  [UserProp.CreatedAt]?: Date;
}
