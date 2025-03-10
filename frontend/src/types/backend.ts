export { AUTH_NAME } from '../../../backend/libs/shared/core/src/lib/constants/bearer-auth';
export type { Token } from '../../../backend/libs/shared/core/src/lib/interfaces/token.interface';
export type { User } from '../../../backend/libs/shared/core/src/lib/interfaces/user.interface';

//!LoginUserDto

export interface LoginUserDto {
  email: string;
  password: string;
}
