import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';

export enum UserProp {
  Password = 'password',
  AvatarFile = 'avatarFile',
  AvatarSrc = 'avatarSrc',
  CreatedAt = 'createdAt',
  RegistrationDate = 'registrationDate'
}

export interface User {
  id?: string;
  name: string;
  email: string;
  birthday?: Date;
  metroStationName: MetroStationName;
  backgroundPath: string;
  gender: UserGender;
  role: UserRole;
  avatarFileId?: string;
  existQuestionnaire: boolean;
  createdAt?: Date;
}
