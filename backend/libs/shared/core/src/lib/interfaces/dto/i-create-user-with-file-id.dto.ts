import { User, UserProp } from '../user.interface';

export interface ICreateUserWithFileIdDto extends Omit<User, UserProp.Id | UserProp.Birthday | UserProp.ExistQuestionnaire> {
  [UserProp.Password]: string;
  [UserProp.Birthday]?: string;
}
