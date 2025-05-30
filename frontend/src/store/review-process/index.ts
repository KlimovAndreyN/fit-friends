import { createSlice } from '@reduxjs/toolkit';

import { ReviewProcess } from '../../types/process/review.process';
import { fetchReviews } from '../actions/review-action';
import { StoreSlice } from '../../const';

const initialState: ReviewProcess = {
  isFetchReviewsExecuting: false,
  reviews: []
};

export const reviewProcess = createSlice(
  {
    name: StoreSlice.ReviewProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          fetchReviews.pending,
          (state) => {
            state.isFetchReviewsExecuting = true;
          }
        )
        .addCase(
          fetchReviews.rejected,
          (state) => {
            state.reviews = initialState.reviews;
            state.isFetchReviewsExecuting = false;
          }
        )
        .addCase(
          fetchReviews.fulfilled,
          (state, { payload }) => {
            state.reviews = payload;
            state.isFetchReviewsExecuting = false;
          }
        );
    }
  }
);
