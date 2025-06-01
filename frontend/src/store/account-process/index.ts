import { createSlice } from '@reduxjs/toolkit';

import { AccountProcess } from '../../types/process/account.process';
import {
  changeReadyForTraining, createQuestionnaire, existQuestionnaire, fetchAccountInfo,
  updateAccountInfo, createCoachCertificate, deleteCoachCertificate, updateCoachCertificate
} from '../actions/account-action';
import { StoreSlice } from '../../const';

const initialState: AccountProcess = {
  isExistQuestionnaireExecuting: false,
  existQuestionnaire: false,

  isCreateQuestionnaireExecuting: false,

  isFetchAccountInfoExecuting: false,
  accountInfo: null,
  coachCertificates: [],

  isUpdateAccountInfoExecuting: false,
  isUpdateAccountInfoError: false,

  isUpdateCoachCertificatesExecuting: false,
  isUpdateCoachCertificatesError: false,

  isReadyForTrainingChangeExecuting: false,
  readyForTraining: false
};

export const accountProcess = createSlice(
  {
    name: StoreSlice.AccountProcess,
    initialState,
    reducers: {
      resetAccountProcess: () => initialState
    },
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
          fetchAccountInfo.pending,
          (state) => {
            state.isFetchAccountInfoExecuting = true;
          }
        )
        .addCase(
          fetchAccountInfo.rejected,
          (state) => {
            state.isFetchAccountInfoExecuting = false;
          }
        )
        .addCase(
          fetchAccountInfo.fulfilled,
          (state, { payload }) => {
            state.accountInfo = payload;
            state.coachCertificates = payload.questionnaire.certificates || [];
            state.readyForTraining = payload.questionnaire.readyForTraining;
            state.isFetchAccountInfoExecuting = false;
          }
        )
        .addCase(
          updateAccountInfo.pending,
          (state) => {
            state.isUpdateAccountInfoError = false;
            state.isUpdateAccountInfoExecuting = true;
          }
        )
        .addCase(
          updateAccountInfo.rejected,
          (state) => {
            state.isUpdateAccountInfoError = true;
            state.isUpdateAccountInfoExecuting = false;
          }
        )
        .addCase(
          updateAccountInfo.fulfilled,
          (state, { payload }) => {
            state.accountInfo = payload;
            state.coachCertificates = payload.questionnaire.certificates || [];
            state.readyForTraining = payload.questionnaire.readyForTraining;
            state.isUpdateAccountInfoError = false;
            state.isUpdateAccountInfoExecuting = false;
          }
        )
        .addCase(
          createCoachCertificate.pending,
          (state) => {
            state.isUpdateCoachCertificatesError = false;
            state.isUpdateCoachCertificatesExecuting = true;
          }
        )
        .addCase(
          createCoachCertificate.rejected,
          (state) => {
            state.isUpdateCoachCertificatesError = true;
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          createCoachCertificate.fulfilled,
          (state, { payload }) => {
            state.coachCertificates.unshift(payload);
            state.isUpdateCoachCertificatesError = false;
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          updateCoachCertificate.pending,
          (state) => {
            state.isUpdateCoachCertificatesError = false;
            state.isUpdateCoachCertificatesExecuting = true;
          }
        )
        .addCase(
          updateCoachCertificate.rejected,
          (state) => {
            state.isUpdateCoachCertificatesError = true;
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          updateCoachCertificate.fulfilled,
          (state, { payload, meta: { arg: { fileId } } }) => {
            state.coachCertificates = state.coachCertificates.map(
              (item) => (item.fileId === fileId ? payload : item)
            );
            state.isUpdateCoachCertificatesError = false;
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          deleteCoachCertificate.pending,
          (state) => {
            state.isUpdateCoachCertificatesError = false;
            state.isUpdateCoachCertificatesExecuting = true;
          }
        )
        .addCase(
          deleteCoachCertificate.rejected,
          (state) => {
            state.isUpdateCoachCertificatesError = true;
            state.isUpdateCoachCertificatesExecuting = false;
          }
        )
        .addCase(
          deleteCoachCertificate.fulfilled,
          (state, action) => {
            state.coachCertificates = state.coachCertificates.filter((item) => (item.fileId !== action.meta.arg));
            state.isUpdateCoachCertificatesError = false;
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

export const { resetAccountProcess } = accountProcess.actions;
