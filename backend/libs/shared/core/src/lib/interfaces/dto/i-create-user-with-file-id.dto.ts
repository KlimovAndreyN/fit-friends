import { User } from '../user.interface';

export interface ICreateUserWithFileIdDto extends Omit<User, 'id' | 'birthday' | 'existQuestionnaire'> {
  password: string;
  birthday?: string;
}
