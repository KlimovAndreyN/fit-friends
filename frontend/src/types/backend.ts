export { AUTH_NAME } from '../../../backend/libs/shared/core/src/lib/constants/bearer-auth';
export type { Token } from '../../../backend/libs/shared/core/src/lib/interfaces/token.interface';
export type { User } from '../../../backend/libs/shared/core/src/lib/interfaces/user.interface';

//!LoginUserDto
//!UserTokenRdo - axios.post<Token>
//!User & Token - api.post<User & Token>

export interface LoginUserDto {
  email: string;
  password: string;
}
