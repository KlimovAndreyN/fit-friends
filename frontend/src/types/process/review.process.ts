import { IReviewRdo } from '@backend/shared/core';

export type ReviewProcess = {
  isFetchReviewsExecuting: boolean;
  reviews: IReviewRdo[];
}
