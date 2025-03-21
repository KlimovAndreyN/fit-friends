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

//! еще упростить...
export const UserAvatarFileValidation = {
  Type: { fileType: UserAvatarOption.MIME_TYPES.join('|') },
  MaxSize: { maxSize: UserAvatarOption.MAX_SIZE },
  Build: {
    fileIsRequired: UserApiProperty.AvatarFile.required,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  }
} as const;

export const parseUserAvatarFilePipeBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator(UserAvatarFileValidation.Type)
    .addMaxSizeValidator(UserAvatarFileValidation.MaxSize)
    .build(UserAvatarFileValidation.Build);
