import { Token } from '../token.interface';
import { User, UserProp } from '../user.interface';

export interface ILoggedUserRdo
  extends
  Pick<User, 'email' | 'name' | 'role' | 'existQuestionnaire'>,
  Token {
  id: User['id'];
};
