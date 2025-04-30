import { State } from '../../types/state';
import { UserProfileProcess } from '../../types/process/user-profile.process';
import { StoreSlice } from '../../const';

export const getIsFetchLookForCompanyUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchLookForCompanyUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchLookForCompanyUserProfilesExecuting;
export const getLookForCompanyUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['lookForCompanyUserProfiles'] => USER_PROFILE_PROCESS.lookForCompanyUserProfiles;

export const getIsFetchUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchUserProfilesExecuting;
export const getUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['userProfiles'] => USER_PROFILE_PROCESS.userProfiles;

export const getIsFetchDetailUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileExecuting'] => TRAINING_PROCESS.isFetchDetailUserProfileExecuting;
export const getIsFetchDetailUserProfileError = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileError'] => TRAINING_PROCESS.isFetchDetailUserProfileError;
export const getDetailUserProfile = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['detailUserProfile'] => TRAINING_PROCESS.detailUserProfile;
