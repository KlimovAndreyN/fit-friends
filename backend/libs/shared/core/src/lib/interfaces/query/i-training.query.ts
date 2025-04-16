import { SortType } from '../../types/sort-type.enum';
import { Specialization } from '../../types/specialization.enum';
import { IPageQuery } from './i-page.query';

export interface ITrainingQuery extends IPageQuery {
  priceMin?: number;
  priceMax?: number;
  caloriesWasteMin?: number;
  caloriesWasteMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  specializations?: Specialization[]; //! может string?
  sortType?: SortType;
}
