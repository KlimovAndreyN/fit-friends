import { User, UserProp } from '../user.interface';

export interface ICreateUserDto extends Omit<User, UserProp.Birthday | UserProp.MetroStationName | UserProp.Gender | UserProp.Role> {
  [UserProp.Password]: string;
  [UserProp.Birthday]?: string;
  [UserProp.MetroStationName]: string;
  [UserProp.Gender]: string;
  [UserProp.Role]: string;
}
