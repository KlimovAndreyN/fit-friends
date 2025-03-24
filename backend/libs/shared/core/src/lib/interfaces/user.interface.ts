import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';

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
  about?: string;
  createdAt?: Date;
}
