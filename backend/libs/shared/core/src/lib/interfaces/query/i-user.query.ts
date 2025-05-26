import { Location } from '../../types/location.enum';
import { Specialization } from '../../types/specialization.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { UserSortType } from '../../types/user-sort-type.enum';
import { IPageQuery } from './i-page.query';

export interface IUserQuery extends IPageQuery {
  locations?: Location[];
  specializations?: Specialization[];
  level?: TrainingLevel;
  sortType?: UserSortType;
}
