import { User } from '../user.interface';

export interface ICreateBasicUserDto
  extends Omit<
    User,
    'id'
    | 'birthday'
    | 'about'
  > {
  password: string;
  birthday?: string;
}
