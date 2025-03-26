import { HttpStatus } from '@nestjs/common';

import { UserWithFileIdRdo } from '../../rdo/user-with-file-id.rdo';
import { TokensRdo } from '../../rdo/tokens.rdo';
import { LoggedUserRdo } from '../../rdo/logged-user.rdo';
import { TokenPayloadRdo } from '../../rdo/token-payload.rdo';
import { AuthenticationMessage } from '../authentication.constant';

export const AuthenticationApiResponse = {
  CheckSuccess: {
    type: TokenPayloadRdo,
    status: HttpStatus.OK,
    description: 'Check access token success.'
  },
  RefreshTokensSuccess: {
    type: TokensRdo,
    status: HttpStatus.OK,
    description: 'Refresh access/refresh tokens success.'
  },
  LoggedSuccess: {
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.'
  },
  LogoutSuccess: {
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully logout.'
  },
  UserCreated: {
    type: UserWithFileIdRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  },
  UserExist: {
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessage.Exists
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.'
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.'
  },
  UserFound: {
    type: UserWithFileIdRdo,
    status: HttpStatus.OK,
    description: 'User found.'
  },
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessage.NotFound
  }
} as const;
