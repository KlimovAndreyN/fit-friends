import { HttpStatus } from '@nestjs/common';

import { UserRdo } from '../../rdo/user.rdo';
import { UserTokenRdo } from '../../rdo/user-token.rdo';
import { LoggedUserRdo } from '../../rdo/logged-user.rdo';
import { TokenPayloadRdo } from '../../rdo/token-payload.rdo';
import { AuthenticationUserMessage } from '../authentication.constant';

export const AuthenticationApiResponse = {
  UserCreated: {
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  },
  UserExist: {
    status: HttpStatus.CONFLICT,
    description: AuthenticationUserMessage.Exists
  },
  RefreshTokens: {
    type: UserTokenRdo,
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens.'
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.'
  },
  NotAllow: {
    status: HttpStatus.FORBIDDEN,
    description: AuthenticationUserMessage.RequireLogout
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.'
  },
  LoggedSuccess: {
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  },
  LogoutSuccess: {
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully logout.'
  },
  CheckSuccess: {
    type: TokenPayloadRdo,
    status: HttpStatus.OK,
    description: 'Check access token success.'
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.'
  },
  UserFound: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found.'
  },
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationUserMessage.NotFound
  }
} as const;
