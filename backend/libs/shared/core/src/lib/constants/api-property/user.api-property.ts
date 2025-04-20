import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Role } from '../../types/role.enum';

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
  Location: {
    description: 'The user metro station name',
    type: 'string',
    enum: Location,
    example: Location.Petrogradskaya
  },
  BackgroundPath: {
    description: 'The user background path',
    type: 'string',
    example: '/some/path/img.jpg'
  },
  Gender: {
    description: 'The user gender',
    type: 'string',
    enum: Gender,
    example: Gender.Male
  },
  Role: {
    description: 'The user role',
    type: 'string',
    enum: Role,
    example: Role.Sportsman
  },
  RegistrationDate: {
    description: 'The user registration date',
    type: 'string',
    example: '2025-03-20T00:00:00.000Z'
  }
} as const;

export const AuthenticationMessage = {
  Exists: 'User with this email already exists.',
  NotFound: 'User not found.',
  WrongPassword: 'User password is wrong.',
  RequireLogout: 'Require logout.'
} as const;

export const UserValidation = {
  Name: {
    Regexp: /^[a-zA-Zа-яА-ЯёЁ]{1,15}$/
  },
  Password: {
    MinLength: 6,
    MaxLength: 12
  },
  About: {
    MinLength: 10,
    MaxLength: 140
  },
  AvatarFile: {
    Types: ['image/jpg', 'image/jpeg', 'image/png'],
    MaxSize: 1024 * 1024
  },
  BackgroundPath: {
    Regexp: /\.(jpeg|jpg|png)$/
  }
} as const;

export const parseUserAvatarFilePipeBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: UserValidation.AvatarFile.Types.join('|') })
    .addMaxSizeValidator({ maxSize: UserValidation.AvatarFile.MaxSize })
    .build({
      fileIsRequired: UserApiProperty.AvatarFile.required,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    });
