import { UserWithAvatarFileRdo } from '../../rdo/user-with-avatar-file.rdo';
import { AuthenticationApiResponse } from './authentication.api-response';

export const ApiApiResponse = {
  UserCreated: {
    ...AuthenticationApiResponse.UserCreated,
    type: UserWithAvatarFileRdo
  },
  UserFound: {
    ...AuthenticationApiResponse.UserFound,
    type: UserWithAvatarFileRdo
  }
} as const;
