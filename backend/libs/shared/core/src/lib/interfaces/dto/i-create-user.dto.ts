import { MetroStationName } from '../../types/metro-station-name.enum';
import { UserGender } from '../../types/user-gender.enum';
import { UserRole } from '../../types/user-role.enum';

export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  birthday?: string;
  metroStationName: MetroStationName;
  backgroundPath: string;
  gender: UserGender;
  role: UserRole;
}
