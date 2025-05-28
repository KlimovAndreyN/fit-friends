import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUsersProfilesWithPaginationRdo } from '../interfaces/rdo/i-users-profiles-with-pagination.rdo';
import { PaginationRdo } from './pagination.rdo';
import { UserProfileRdo } from './user-profile.rdo';

export class UsersProfilesWithPaginationRdo
  extends PickType(
    PaginationRdo,
    [
      'currentPage',
      'itemsPerPage',
      'totalItems',
      'totalPages'
    ]
  )
  implements IUsersProfilesWithPaginationRdo {
  @ApiProperty({
    type: UserProfileRdo,
    isArray: true
  })
  @Expose()
  public entities: UserProfileRdo[];
}
