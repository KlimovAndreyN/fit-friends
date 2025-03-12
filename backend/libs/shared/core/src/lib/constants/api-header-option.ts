import { XHeader } from './x-header';
import { UserApiProperty } from './api-property/user.api-property';

export const ApiHeaderOption = {
  RequestId: {
    name: XHeader.RequestId,
    example: '2f31b19b-97eb-4305-877a-0b9bd7faca8f',
    description: 'X-Request-Id',
    required: false
  },
  UserId: {
    name: XHeader.UserId,
    example: UserApiProperty.Id.example,
    description: 'X-User-Id',
    required: false
  }
} as const;
