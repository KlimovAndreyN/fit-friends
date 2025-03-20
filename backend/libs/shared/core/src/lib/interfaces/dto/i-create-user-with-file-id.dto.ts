import { User, UserProp } from '../user.interface';

export interface ICreateUserWithFileIdDto extends Omit<User, 'id' | 'birthday' | 'existQuestionnaire'> {
  [UserProp.Password]: string;
  birthday?: string;
}
