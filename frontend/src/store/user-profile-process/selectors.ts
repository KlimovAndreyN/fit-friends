import { State } from '../../types/state';
import { UserProfileProcess } from '../../types/process/user-profile.process';
import { StoreSlice } from '../../const';

export const getIsFetchLookForCompanyUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchLookForCompanyUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchLookForCompanyUserProfilesExecuting;
export const getLookForCompanyUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['lookForCompanyUserProfiles'] => USER_PROFILE_PROCESS.lookForCompanyUserProfiles;

export const getUsersFilter = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['usersFilter'] => USER_PROFILE_PROCESS.usersFilter;
export const getIsUsersFilterActivate = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isUsersFilterActivate'] => USER_PROFILE_PROCESS.isUsersFilterActivate;
export const getIsFetchUsersExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchUsersExecuting'] => USER_PROFILE_PROCESS.isFetchUsersExecuting;
export const getUsers = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['users'] => USER_PROFILE_PROCESS.users;
export const getIsHaveMoreUsers = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isHaveMoreUsers'] => USER_PROFILE_PROCESS.isHaveMoreUsers;

export const getIsFetchDetailUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileExecuting'] => TRAINING_PROCESS.isFetchDetailUserProfileExecuting;
export const getIsFetchDetailUserProfileError = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileError'] => TRAINING_PROCESS.isFetchDetailUserProfileError;
export const getDetailUserProfile = ({ [StoreSlice.UserProfileProcess]: TRAINING_PROCESS }: State): UserProfileProcess['detailUserProfile'] => TRAINING_PROCESS.detailUserProfile;
