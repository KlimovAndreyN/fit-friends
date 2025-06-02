import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IFriendsWithPaginationRdo } from '../interfaces/rdo/i-friends-with-pagination.rdo';
import { PaginationRdo } from './pagination.rdo';
import { FriendRdo } from './friend.rdo';

export class FriendsWithPaginationRdo
  extends PickType(
    PaginationRdo,
    [
      'currentPage',
      'itemsPerPage',
      'totalItems',
      'totalPages'
    ]
  )
  implements IFriendsWithPaginationRdo {
  @ApiProperty({
    type: FriendRdo,
    isArray: true
  })
  @Expose()
  public entities: IFriendsWithPaginationRdo['entities'];
}
