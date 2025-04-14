import { Review } from '../review.interface';

export interface IBasicReviewRdo
  extends Pick<
    Required<Review>,
    'message'
    | 'rating'
    | 'userId'
  > {
  createdAt: string;
}
