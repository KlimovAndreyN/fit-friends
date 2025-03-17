import { User } from '../user.interface';

export interface ICreateUserDto extends Omit<User, 'birthday' | 'metroStationName' | 'gender' | 'role'> {
  password: string;
  birthday?: string;
  metroStationName: string;
  gender: string;
  role: string;
}
