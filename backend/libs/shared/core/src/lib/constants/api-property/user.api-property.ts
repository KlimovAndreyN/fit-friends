import { MetroStationName } from '../../types/metro-station-name.enum';
import { UserGender } from '../../types/user-gender.enum';
import { UserRole } from '../../types/user-role.enum';

export const UserApiProperty = {
  Id: {
    description: 'The unique user ID',
    example: '658170cbb954e9f5b905ccf4',
    type: 'string'
  },
  Email: {
    description: 'The unique user email',
    example: 'user@local.local',
    type: 'string'
  },
  Name: {
    description: 'The user name',
    example: 'Name',
    type: 'string'
  },
  Password: {
    description: 'The user password',
    example: 'password',
    type: 'string'
  },
  About: {
    description: 'The user about',
    example: 'About about about',
    type: 'string',
    required: false
  },
  AvatarFileId: {
    description: 'The user avatar file id',
    example: '658170cbb954e9f5b905ddf4',
    type: 'string',
    required: false
  },
  AvatarFile: {
    description: 'The avatar file',
    type: 'string',
    format: 'binary',
    required: false
  },
  EmptyAvatarFile: {
    description: 'The empty avatar file',
    type: 'boolean',
    example: false,
    required: false
  },
  AvatarFilePath: {
    description: 'The avatar file src',
    type: 'string',
    example: '/path/img.jpg',
    required: false
  },
  Birthday: {
    description: 'The user dirthday date, in "2025-03-20" or "2025-03-20T00:00:00.000Z", out "2025-03-20T00:00:00.000Z"',
    type: 'string',
    example: '2025-03-20T00:00:00.000Z',
    required: false
  },
  MetroStationName: {
    description: 'The user metro station name',
    type: 'string',
    enum: MetroStationName,
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
    enum: UserGender,
    example: UserGender.Male
  },
  Role: {
    description: 'The user role',
    type: 'string',
    enum: UserRole,
    example: UserRole.Sportsman
  },
  RegistrationDate: {
    description: 'The user registration date',
    type: 'string',
    example: '2025-03-20T00:00:00.000Z'
  }
} as const;
