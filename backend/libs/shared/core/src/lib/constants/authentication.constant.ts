import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

import { UserApiProperty } from './api-property/user.api-property';

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

export const QuestionnaireValidation = {
  Specializations: {
    ArrayMinSize: 1,
    ArrayMaxSize: 3
  },
  CaloriesLose: {
    Min: 1000,
    Max: 5000
  },
  CaloriesWaste: {
    Min: 1000,
    Max: 5000
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
