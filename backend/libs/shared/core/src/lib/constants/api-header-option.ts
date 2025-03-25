import { ApiHeaderOptions } from '@nestjs/swagger';

import { XHeader } from './x-header';
import { UserApiProperty } from './api-property/user.api-property';

export const XRequestIdApiHeaderOptions: ApiHeaderOptions = {
  name: XHeader.RequestId,
  examples: { 'RequestId': { value: '2f31b19b-97eb-4305-877a-0b9bd7faca8f' } },
  //example: '2f31b19b-97eb-4305-877a-0b9bd7faca8f', //! не работает посмотреть на других версиях swagger
  description: 'X-Request-Id',
  required: false
} as const;

const XUserIdApiHeaderOptions: ApiHeaderOptions = {
  name: XHeader.UserId,
  examples: { 'UserId': { value: UserApiProperty.Id.example } },
  //example: UserApiProperty.Id.example, //! не работает посмотреть на других версиях swagger
  description: 'X-User-Id',
  required: true
} as const;

export const XApiHeaderOptions: ApiHeaderOptions[] = [XUserIdApiHeaderOptions, XRequestIdApiHeaderOptions] as const;
