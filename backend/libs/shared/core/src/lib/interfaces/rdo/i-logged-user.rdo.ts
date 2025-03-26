import { Token } from '../token.interface';
import { User } from '../user.interface';

export interface ILoggedUserRdo
  extends Pick<User, 'email' | 'name' | 'role'> {
  id: User['id'];
  token: Token;
};
