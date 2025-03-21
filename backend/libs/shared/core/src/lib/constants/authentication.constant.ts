import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

import { UserApiProperty } from './api-property/user.api-property';

export const AuthenticationMessage = {
  Exists: 'User with this email already exists.',
  NotFound: 'User not found.',
  WrongPassword: 'User password is wrong.',
  RequireLogout: 'Require logout.'
} as const;

export const UserAvatarOption = {
  KEY: 'avatarFile',
  MAX_SIZE: 1024 * 1024,
  MIME_TYPES: ['image/jpg', 'image/jpeg', 'image/png']
} as const;

export const UserValidation = {
  Name: {
    Regexp: /^[a-zA-Zа-яА-ЯёЁ]{1,15}$/
  },
  Password: {
    MinLength: 6,
    MaxLength: 12
  },
  AvatarFile: {
    Type: { fileType: UserAvatarOption.MIME_TYPES.join('|') },
    MaxSize: { maxSize: UserAvatarOption.MAX_SIZE },
    Build: {
      fileIsRequired: UserApiProperty.AvatarFile.required,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }
  },
  BackgroundPath: {
    Regexp: /\.(jpeg|jpg|png)$/
  }
} as const;

export const parseUserAvatarFilePipeBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator(UserValidation.AvatarFile.Type)
    .addMaxSizeValidator(UserValidation.AvatarFile.MaxSize)
    .build(UserValidation.AvatarFile.Build);
