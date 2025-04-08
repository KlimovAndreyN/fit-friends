import { User } from '../user.interface';

export interface ICreateUserWithFileIdDto
  extends Omit<
    User,
    'id'
    | 'birthday'
  > {
  password: string;
  birthday?: string;
}
