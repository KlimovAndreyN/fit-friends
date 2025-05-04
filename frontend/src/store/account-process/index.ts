import { createSlice } from '@reduxjs/toolkit';

import { AccountProcess } from '../../types/process/account.process';
import {
  changeReadyForTraining, createQuestionnaire, existQuestionnaire, fetchAccount,
  updateAccount, createCoachCertificate, deleteCoachCertificate, updateCoachCertificate
} from '../actions/account-action';
import { StoreSlice } from '../../const';

const initialState: AccountProcess = {
  isExistQuestionnaireExecuting: false,
  existQuestionnaire: false,

  isCreateQuestionnaireExecuting: false,

  isFetchAccountExecuting: false,
  account: null,
  coachCertificates: [],

  isUpdateAccountExecuting: false,
  isUpdateAccountError: false,

  isUpdateCoachCertificatesExecuting: false,

  isReadyForTrainingChangeExecuting: false,
  readyForTraining: false,
};

export const accountProcess = createSlice(
  {
    name: StoreSlice.UserProfileProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          existQuestionnaire.pending,
          (state) => {
            state.isExistQuestionnaireExecuting = true;
          }
        )
        .addCase(
          existQuestionnaire.rejected,
          (state) => {
            state.existQuestionnaire = false;
            state.isExistQuestionnaireExecuting = false;
          }
        )
        .addCase(
          existQuestionnaire.fulfilled,
          (state) => {
            state.existQuestionnaire = true;
            state.isExistQuestionnaireExecuting = false;
          }
        )
        .addCase(
          createQuestionnaire.pending,
          (state) => {
            state.isCreateQuestionnaireExecuting = true;
          }
        )
        .addCase(
          createQuestionnaire.rejected,
          (state) => {
            state.isCreateQuestionnaireExecuting = false;
          }
        )
        .addCase(
          createQuestionnaire.fulfilled,
          (state) => {
            state.existQuestionnaire = true;
            state.isCreateQuestionnaireExecuting = false;
          }
        )
        .addCase(
          fetchAccount.pending,
          (state) => {
            state.isFetchAccountExecuting = true;
          }
        )
        .addCase(
          fetchAccount.rejected,
          (state) => {
            state.isFetchAccountExecuting = false;
          }
        )
        .addCase(
          fetchAccount.fulfilled,
          (state, { payload }) => {
            state.account = payload;
            state.coachCertificates = payload.questionnaire.certificates || [];
            state.readyForTraining = payload.questionnaire.readyForTraining;
            state.isFetchAccountExecuting = false;
          }
        )
        .addCase(
          updateAccount.pending,
          (state) => {
            state.isUpdateAccountError = false;
            state.isUpdateAccountExecuting = true;
          }
        )
        .addCase(
          updateAccount.rejected,
          (state) => {
            state.isUpdateAccountError = true;
            state.isUpdateAccountExecuting = false;
          }
        )
        .addCase(
          updateAccount.fulfilled,
          (state, { payload }) => {
            state.account = payload;
            state.coachCertificates = payload.questionnaire.certificates || [];
            state.readyForTraining = payload.questionnaire.readyForTraining;
            state.isUpdateAccountError = false;
            state.isUpdateAccountExecuting = false;
          }
        )
        .addCase(
          createCoachCertificate.pending,
          (state) => {
            state.isUpdateCoachCertificatesExecuting = true;
          }
        )
        .addCase(
          createCoachCertificate.rejected,
          (state) => {
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          createCoachCertificate.fulfilled,
          (state, { payload }) => {
            state.coachCertificates.unshift(payload);
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          updateCoachCertificate.pending,
          (state) => {
            state.isUpdateCoachCertificatesExecuting = true;
          }
        )
        .addCase(
          updateCoachCertificate.rejected,
          (state) => {
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          updateCoachCertificate.fulfilled,
          (state, { payload, meta: { arg: { fileId } } }) => {
            state.coachCertificates = state.coachCertificates.map(
              (item) => (item.fileId === fileId ? payload : item)
            );
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          deleteCoachCertificate.pending,
          (state) => {
            state.isUpdateCoachCertificatesExecuting = true;
          }
        )
        .addCase(
          deleteCoachCertificate.rejected,
          (state) => {
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          deleteCoachCertificate.fulfilled,
          (state, action) => {
            state.coachCertificates = state.coachCertificates.filter((item) => (item.fileId !== action.meta.arg));
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          changeReadyForTraining.pending,
          (state) => {
            state.isReadyForTrainingChangeExecuting = true;
          }
        )
        .addCase(
          changeReadyForTraining.rejected,
          (state) => {
            state.isReadyForTrainingChangeExecuting = false;
          }
        )
        .addCase(
          changeReadyForTraining.fulfilled,
          (state, { payload }) => {
            state.readyForTraining = payload;
            state.isReadyForTrainingChangeExecuting = false;
          }
        );
    }
  }
);
