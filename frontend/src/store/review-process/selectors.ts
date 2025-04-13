import { State } from '../../types/state';
import { ReviewProcess } from '../../types/review-process';
import { StoreSlice } from '../../const';

export const getIsFetchReviewsExecuting = ({ [StoreSlice.ReviewProcess]: REVIEW_PROCESS }: State): ReviewProcess['isFetchReviewsExecuting'] => REVIEW_PROCESS.isFetchReviewsExecuting;
export const getReviews = ({ [StoreSlice.ReviewProcess]: REVIEW_PROCESS }: State): ReviewProcess['reviews'] => REVIEW_PROCESS.reviews;
