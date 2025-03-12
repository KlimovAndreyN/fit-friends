import { HttpStatus } from '@nestjs/common';

import { UserRdo } from '../../rdo/user.rdo';
import { UserTokenRdo } from '../../rdo/user-token.rdo';
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
    type: UserTokenRdo,
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
    type: UserRdo,
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
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found.'
  },
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessage.NotFound
  }
} as const;
