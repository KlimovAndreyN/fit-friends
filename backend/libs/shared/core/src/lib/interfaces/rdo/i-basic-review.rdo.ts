import { Review } from '../review.interface';

export type IBasicReviewRdo = Pick<
  Required<Review>,
  'message'
  | 'rating'
  | 'createdAt'
  | 'userId'
>;
