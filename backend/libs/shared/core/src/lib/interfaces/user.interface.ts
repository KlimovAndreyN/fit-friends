import { Location } from '../types/location.enum';
import { Gender } from '../types/gender.enum';
import { Role } from '../types/role.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  birthday?: Date;
  location: Location;
  backgroundPath: string;
  gender: Gender;
  role: Role;
  avatarFileId?: string;
  about?: string;
  createdAt?: Date;
}
