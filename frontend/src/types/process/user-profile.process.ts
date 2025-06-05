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
  isFriendUserProfile?: boolean; // если не отдельно, то происходит перерисовка всей детальной карточки
  isFriendUserProfileChangeExecuting: boolean;
  personalTrainingRequest?: ITrainingRequestRdo | null; // если не отдельно, то происходит перерисовка всей детальной карточки
  isCreateRequestExecuting: boolean;
}
