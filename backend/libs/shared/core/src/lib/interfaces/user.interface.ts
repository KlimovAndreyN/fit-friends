import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';

export enum UserProp {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  AvatarFileId = 'avatarFileId',
  AvatarFile = 'avatarFile',
  Birthday = 'birthday',
  MetroStationName = 'metroStationName',
  Gender = 'gender',
  Role = 'role'
}

export interface User {
  id?: string;
  [UserProp.Name]: string;
  [UserProp.Email]: string;
  [UserProp.Birthday]?: Date;
  [UserProp.MetroStationName]: MetroStationName;
  backgroundPath: string;
  [UserProp.Gender]: UserGender;
  [UserProp.Role]: UserRole;
  [UserProp.AvatarFileId]?: string;
  createdAt?: Date;
}
