import { User } from '../user.interface';

export interface ICreateBasicUserDto
  extends Omit<
    User,
    'id'
    | 'birthday'
  > {
  password: string;
  birthday?: string;
}
