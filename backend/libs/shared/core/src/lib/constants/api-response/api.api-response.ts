import { DetailUserRdo } from '../../rdo/detail-user.rdo';
import { AuthenticationApiResponse } from './authentication.api-response';

export const ApiApiResponse = {
  UserCreated: {
    ...AuthenticationApiResponse.UserCreated,
    type: DetailUserRdo
  },
  UserFound: {
    ...AuthenticationApiResponse.UserFound,
    type: DetailUserRdo
  }
} as const;
