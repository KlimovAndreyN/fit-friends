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

export const getIsFetchFriendsExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchFriendsExecuting'] => USER_PROFILE_PROCESS.isFetchFriendsExecuting;
export const getFriends = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['friends'] => USER_PROFILE_PROCESS.friends;
export const getIsHaveMoreFriends = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isHaveMoreFriends'] => USER_PROFILE_PROCESS.isHaveMoreFriends;

export const getIsFetchDetailUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileExecuting'] => USER_PROFILE_PROCESS.isFetchDetailUserProfileExecuting;
export const getIsFetchDetailUserProfileError = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchDetailUserProfileError'] => USER_PROFILE_PROCESS.isFetchDetailUserProfileError;
export const getDetailUserProfile = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['detailUserProfile'] => USER_PROFILE_PROCESS.detailUserProfile;
export const getIsFriendUserProfile = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFriendUserProfile'] => USER_PROFILE_PROCESS.isFriendUserProfile;
export const getIsFriendUserProfileChangeExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFriendUserProfileChangeExecuting'] => USER_PROFILE_PROCESS.isFriendUserProfileChangeExecuting;
