import { MetroStationName } from '../types/metro-station-name.enum';
import { Gender } from '../types/gender.enum';
import { Role } from '../types/role.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  birthday?: Date;
  metroStationName: MetroStationName;
  backgroundPath: string;
  gender: Gender;
  role: Role;
  avatarFileId?: string;
  about?: string;
  createdAt?: Date;
}
