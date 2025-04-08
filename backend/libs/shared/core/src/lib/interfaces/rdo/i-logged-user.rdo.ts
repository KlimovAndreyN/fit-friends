import { Tokens } from '../tokens.interface';
import { User } from '../user.interface';

export interface ILoggedUserRdo
  extends Pick<
    User,
    'email'
    | 'name'
    | 'role'
  > {
  id: User['id'];
  tokens: Tokens;
};
