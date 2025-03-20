import { User, UserProp } from '../user.interface';

export interface ICreateUserWithFileIdDto extends Omit<User, 'id' | 'birthday' | UserProp.ExistQuestionnaire> {
  [UserProp.Password]: string;
  birthday?: string;
}
