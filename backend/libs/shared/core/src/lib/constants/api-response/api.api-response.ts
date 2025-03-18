import { UserRdo } from '../../rdo/user.rdo';
import { AuthenticationApiResponse } from './authentication.api-response';

export const ApiApiResponse = {
  UserCreated: {
    ...AuthenticationApiResponse.UserCreated,
    type: UserRdo
  },
  UserFound: {
    ...AuthenticationApiResponse.UserFound,
    type: UserRdo
  }
} as const;
