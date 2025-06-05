import { IDetailUserProfileRdo, IUserProfileRdo, IUserProfileQuery, IFriendProfileRdo, ITrainingRequestRdo } from '@backend/shared/core';

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
  isFriendUserProfile?: boolean; //! проверить - возможно и без вынесенных полей будет нормально обновляться
  isFriendUserProfileChangeExecuting: boolean;
  personalTrainingRequest?: ITrainingRequestRdo | null; //! проверить - возможно и без вынесенных полей будет нормально обновляться
  isCreateRequestExecuting: boolean;
}
