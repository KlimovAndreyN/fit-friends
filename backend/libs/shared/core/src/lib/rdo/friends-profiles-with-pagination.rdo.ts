import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IFriendsProfilesWithPaginationRdo } from '../interfaces/rdo/i-friends-profiles-with-pagination.rdo';
import { PaginationRdo } from './pagination.rdo';
import { FriendProfileRdo } from './friend-profile.rdo';

export class FriendsProfilesWithPaginationRdo
  extends PickType(
    PaginationRdo,
    [
      'currentPage',
      'itemsPerPage',
      'totalItems',
      'totalPages'
    ]
  )
  implements IFriendsProfilesWithPaginationRdo {
  @ApiProperty({
    type: FriendProfileRdo,
    isArray: true
  })
  @Expose()
  public entities: IFriendsProfilesWithPaginationRdo['entities'];
}
