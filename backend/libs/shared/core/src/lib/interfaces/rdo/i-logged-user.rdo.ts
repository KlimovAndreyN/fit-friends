import { Token } from '../token.interface';
import { User } from '../user.interface';

export interface ILoggedUserRdo
  extends
  Pick<User, 'email' | 'name' | 'role'>,
  Token {
  id: User['id'];
};
