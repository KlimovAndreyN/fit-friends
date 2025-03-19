import { Token } from '../token.interface';
import { User, UserProp } from '../user.interface';

export interface ILoggedUserRdo
  extends
  Pick<User, UserProp.Email | UserProp.Name | UserProp.Role | UserProp.ExistQuestionnaire>,
  Token {
  [UserProp.Id]: User[UserProp.Id];
};
