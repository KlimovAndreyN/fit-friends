import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ITrainingsWithPaginationRdo } from '../interfaces/rdo/i-trainings-with-pagination.rdo';
import { PaginationRdo } from './pagination.rdo';
import { TrainingRdo } from './training.rdo';

export class TrainingsWithPaginationRdo
  extends PickType(
    PaginationRdo,
    [
      'currentPage',
      'itemsPerPage',
      'totalItems',
      'totalPages'
    ]
  )
  implements ITrainingsWithPaginationRdo {
  @ApiProperty({
    type: TrainingRdo,
    isArray: true
  })
  @Expose()
  public entities: TrainingRdo[];

  @ApiProperty()
  @Expose()
  public trainingsMaxPrice?: ITrainingsWithPaginationRdo['trainingsMaxPrice'];
}
