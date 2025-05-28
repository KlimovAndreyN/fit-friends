import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IBasicUsersProfilesWithPaginationRdo } from '../interfaces/rdo/i-basic-users-profiles-with-pagination.rdo';
import { PaginationRdo } from './pagination.rdo';
import { BasicUserProfileRdo } from './basic-user-profile.rdo';

export class BasicUsersProfilesWithPaginationRdo
  extends PickType(
    PaginationRdo,
    [
      'currentPage',
      'itemsPerPage',
      'totalItems',
      'totalPages'
    ]
  )
  implements IBasicUsersProfilesWithPaginationRdo {
  @ApiProperty({
    type: BasicUserProfileRdo,
    isArray: true
  })
  @Expose()
  public entities: BasicUserProfileRdo[];
}
