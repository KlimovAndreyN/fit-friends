import { IBasicReviewRdo } from './i-basic-review.rdo';
import { IUserProfileRdo } from './i-user-profile.rdo';

export interface IReviewRdo
  extends Pick<
    IBasicReviewRdo,
    'message'
    | 'rating'
    | 'createdAt'
  > {
  user: IUserProfileRdo;
}
