import { createSlice } from '@reduxjs/toolkit';

import { UserProfileProcess } from '../../types/process/user-profile.process';
import {
  changeReadyForTraining, fetchLookForCompanyUserProfiles, createQuestionnaire,
  existQuestionnaire, fetchUserProfile, fetchUserProfiles, updateUserProfile,
  createCoachCertificate, deleteCoachCertificate, updateCoachCertificate
} from '../actions/user-profile-action';
import { StoreSlice } from '../../const';

const initialState: UserProfileProcess = {
  isExistQuestionnaireExecuting: false,
  existQuestionnaire: false,
  isCreateQuestionnaireExecuting: false,
  isFetchUserProfileExecuting: false,
  userProfile: null,
  coachCertificates: [],
  isUpdateUserProfileExecuting: false,
  isUpdateUserProfileError: false,
  isUpdateCoachCertificatesExecuting: false,
  isReadyForTrainingChangeExecuting: false,
  readyForTraining: false,
  isFetchLookForCompanyUserProfilesExecuting: false,
  lookForCompanyUserProfiles: [],
  isFetchUserProfilesExecuting: false,
  userProfiles: []
};

export const userProfileProcess = createSlice(
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
          fetchUserProfile.pending,
          (state) => {
            state.isFetchUserProfileExecuting = true;
          }
        )
        .addCase(
          fetchUserProfile.rejected,
          (state) => {
            state.userProfile = initialState.userProfile;
            state.isFetchUserProfileExecuting = false;
          }
        )
        .addCase(
          fetchUserProfile.fulfilled,
          (state, { payload }) => {
            state.userProfile = payload;
            state.coachCertificates = payload.questionnaire.certificates || [];
            state.readyForTraining = payload.questionnaire.readyForTraining;
            state.isFetchUserProfileExecuting = false;
          }
        )
        .addCase(
          updateUserProfile.pending,
          (state) => {
            state.isUpdateUserProfileError = false;
            state.isUpdateUserProfileExecuting = true;
          }
        )
        .addCase(
          updateUserProfile.rejected,
          (state) => {
            state.isUpdateUserProfileError = true;
            state.isUpdateUserProfileExecuting = false;
          }
        )
        .addCase(
          updateUserProfile.fulfilled,
          (state, { payload }) => {
            state.userProfile = payload;
            state.coachCertificates = payload.questionnaire.certificates || [];
            state.readyForTraining = payload.questionnaire.readyForTraining;
            state.isUpdateUserProfileError = false;
            state.isUpdateUserProfileExecuting = false;
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
          (state, action) => {
            state.coachCertificates.unshift(action.payload);
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
          (state, action) => {
            state.coachCertificates = state.coachCertificates.map(
              (item) => (item.fileId === action.meta.arg.fileId ? action.payload : item)
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
          (state, action) => {
            state.readyForTraining = action.payload;
            state.isReadyForTrainingChangeExecuting = false;
          }
        )
        .addCase(
          fetchLookForCompanyUserProfiles.pending,
          (state) => {
            state.isFetchLookForCompanyUserProfilesExecuting = true;
          }
        )
        .addCase(
          fetchLookForCompanyUserProfiles.rejected,
          (state) => {
            state.lookForCompanyUserProfiles = initialState.lookForCompanyUserProfiles;
            state.isFetchLookForCompanyUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchLookForCompanyUserProfiles.fulfilled,
          (state, action) => {
            state.lookForCompanyUserProfiles = action.payload;
            state.isFetchLookForCompanyUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchUserProfiles.pending,
          (state) => {
            state.isFetchUserProfilesExecuting = true;
          }
        )
        .addCase(
          fetchUserProfiles.rejected,
          (state) => {
            state.userProfiles = initialState.userProfiles;
            state.isFetchUserProfilesExecuting = false;
          }
        )
        .addCase(
          fetchUserProfiles.fulfilled,
          (state, action) => {
            state.userProfiles = action.payload;
            state.isFetchUserProfilesExecuting = false;
          }
        );
    }
  }
);
