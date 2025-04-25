import { IntersectionType, PickType } from '@nestjs/swagger';

import { ITrainingsWithPaginationRdo } from '../../fronted-index';
import { PaginationRdo } from './pagination.rdo';
import { TrainingApiDoc } from '../constants/api-doc/training.api-doc';

export class TrainingsWithPaginationRdo
  extends IntersectionType(
    PickType(
      PaginationRdo,
      [
        'currentPage',
        'itemsPerPage',
        'totalItems',
        'totalPages'
      ]
    ),
    PickType(
      TrainingApiDoc,
      [
        'entities',
        'maxPrice'
      ]
    )
  )
  implements ITrainingsWithPaginationRdo { }
