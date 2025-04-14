import { IBasicReviewRdo } from './i-basic-review.rdo';
import { IUserRdo } from './i-user.rdo';

export interface IReviewRdo
  extends Pick<
    IBasicReviewRdo,
    'message'
    | 'rating'
    | 'createdAt'
  > {
  user: IUserRdo;
}
