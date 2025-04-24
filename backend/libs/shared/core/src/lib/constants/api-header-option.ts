import { ApiHeaderOptions } from '@nestjs/swagger';

import { Role } from '../types/role.enum';
import { XHeader } from './x-header';
import { UserApiProperty } from './api-property/user.api-property';

export const XRequestIdApiHeaderOptions: ApiHeaderOptions = {
  name: XHeader.RequestId,
  examples: { ['2f31b19b-97eb-4305-877a-0b9bd7faca8f']: { value: '2f31b19b-97eb-4305-877a-0b9bd7faca8f' } },
  //example: '2f31b19b-97eb-4305-877a-0b9bd7faca8f', //! не работает посмотреть на других версиях swagger
  description: XHeader.RequestId,
  required: false
} as const;

const XUserIdApiHeaderOptions: ApiHeaderOptions = {
  name: XHeader.UserId,
  examples: { [UserApiProperty.Id.example]: { value: UserApiProperty.Id.example } },
  //example: UserApiProperty.Id.example, //! не работает посмотреть на других версиях swagger
  description: XHeader.UserId,
  required: true
} as const;

const XUserRoleApiHeaderOptions: ApiHeaderOptions = {
  name: XHeader.UserRole,
  examples: { [UserApiProperty.Role.example]: { value: UserApiProperty.Role.example } },
  //example: UserApiProperty.Id.example, //! не работает посмотреть на других версиях swagger
  description: XHeader.UserRole,
  enum: Role,
  required: true
} as const;

export const XApiHeaderOptions: ApiHeaderOptions[] = [XUserIdApiHeaderOptions, XRequestIdApiHeaderOptions] as const;

export const XAllApiHeaderOptions: ApiHeaderOptions[] = [XUserIdApiHeaderOptions, XRequestIdApiHeaderOptions, XUserRoleApiHeaderOptions] as const;
