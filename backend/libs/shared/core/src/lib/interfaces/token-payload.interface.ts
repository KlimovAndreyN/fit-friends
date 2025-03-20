import { User } from './user.interface';

export interface TokenPayload extends Pick<User, 'email' | 'name' | 'role' | 'existQuestionnaire'> {
  sub: User['id'];
}
