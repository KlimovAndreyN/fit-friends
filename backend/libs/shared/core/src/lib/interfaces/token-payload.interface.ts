import { User } from './user.interface';

export interface TokenPayload extends Pick<User, 'email' | 'name' | 'role'> {
  sub: User['id'];
}
