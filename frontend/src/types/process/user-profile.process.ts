import { IDetailUserProfileRdo, IUserProfileRdo, IUserProfileQuery, IFriendProfileRdo } from '@backend/shared/core';

export type UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: boolean;
  lookForCompanyUserProfiles: IUserProfileRdo[];

  usersProfilesFilter: IUserProfileQuery;
  isFristPage: boolean;
  isUsersProfilesFilterActivate: boolean;
  isFetchUsersProfilesExecuting: boolean;
  usersProfiles: IUserProfileRdo[];
  isHaveMoreUsersProfiles: boolean;

  isFetchFriendsExecuting: boolean;
  friends: IFriendProfileRdo[];
  pageFriends: number;
  isHaveMoreFriends: boolean;

  isFetchDetailUserProfileExecuting: boolean;
  isFetchDetailUserProfileError: boolean;
  detailUserProfile: IDetailUserProfileRdo | null;
  isFriendUserProfile?: boolean;
  isFriendUserProfileChangeExecuting: boolean;
  isCreateRequestExecuting: boolean;
}
