import { State } from '../../types/state';
import { UserProfileProcess } from '../../types/process/user-profile.process';
import { StoreSlice } from '../../const';

export const getIsFetchLookForCompanyUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchLookForCompanyUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchLookForCompanyUserProfilesExecuting;
export const getLookForCompanyUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['lookForCompanyUserProfiles'] => USER_PROFILE_PROCESS.lookForCompanyUserProfiles;

export const getUsersProfilesFilter = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['usersProfilesFilter'] => USER_PROFILE_PROCESS.usersProfilesFilter;
export const getIsUsersProfilesFilterActivate = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isUsersProfilesFilterActivate'] => USER_PROFILE_PROCESS.isUsersProfilesFilterActivate;
export const getIsFetchUsersProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchUsersProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchUsersProfilesExecuting;
export const getUsersProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['usersProfiles'] => USER_PROFILE_PROCESS.usersProfiles;
export const getIsHaveMoreUsersProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isHaveMoreUsersProfiles'] => USER_PROFILE_PROCESS.isHaveMoreUsersProfiles;

export const getIsFetchDetailUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileExecuting'] => TRAINING_PROCESS.isFetchDetailUserProfileExecuting;
export const getIsFetchDetailUserProfileError = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileError'] => TRAINING_PROCESS.isFetchDetailUserProfileError;
export const getDetailUserProfile = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['detailUserProfile'] => TRAINING_PROCESS.detailUserProfile;
