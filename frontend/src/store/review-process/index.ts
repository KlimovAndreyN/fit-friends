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
            state.isFetchReviewsExecuting = false;
          }
        )
        .addCase(
          fetchReviews.fulfilled,
          (state, action) => {
            state.reviews = action.payload;
            state.isFetchReviewsExecuting = false;
          }
        );
    }
  }
);
