import { MetroStationName } from '../../types/metro-station-name.enum';
import { UserGender } from '../../types/user-gender.enum';
import { UserRole } from '../../types/user-role.enum';

export const UserApiProperty = {
  Id: {
    description: 'The unique user ID',
    example: '658170cbb954e9f5b905ccf4'
  },
  Email: {
    description: 'The unique user email',
    example: 'user@local.local'
  },
  Name: {
    description: 'The user name',
    example: 'Name'
  },
  Password: {
    description: 'The user password',
    example: 'password'
  },
  AvatarFileId: {
    description: 'The user avatar file id',
    example: '658170cbb954e9f5b905ddf4'
  },
  AvatarFile: {
    required: false,
    description: 'The avatar file',
    type: 'string',
    format: 'binary'
  },
  Birthday: {
    description: 'The user dirthday date',
    type: 'string',
    example: '2005-01-20'
  },
  MetroStationName: {
    description: 'The user metro station name',
    type: 'string',
    example: MetroStationName.Petrogradskaya
  },
  BackgroundPath: {
    description: 'The user background path',
    type: 'string',
    example: '/some/path/img.jpg'
  },
  Gender: {
    description: 'The user gender',
    type: 'string',
    example: UserGender.Male
  },
  Role: {
    description: 'The user role',
    type: 'string',
    example: UserRole.Sportsman
  },
  RegistrationDate: {
    description: 'The user registration date',
    type: 'string',
    example: '2025-01-20'
  },
  AccessToken: {
    description: 'The user access JWT token',
    example: 'asdasdsdfetyhetyhythgfnghnlkcsdkfajowfjlsdkmcv'
  },
  RefreshToken: {
    description: 'The user refresh JWT token',
    example: 'fvdfvbdgbsdfbfgbfgfghdr6he5656hsrthsfhfg'
  }
} as const;
