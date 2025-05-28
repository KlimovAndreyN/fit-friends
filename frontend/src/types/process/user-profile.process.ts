import { IDetailUserProfileRdo, IUserProfileRdo, IUserQuery } from '@backend/shared/core';

export type UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: boolean;
  lookForCompanyUserProfiles: IUserProfileRdo[];

  usersProfilesFilter: IUserQuery;
  isFristPage: boolean;
  isUsersProfilesFilterActivate: boolean;
  isFetchUsersProfilesExecuting: boolean;
  usersProfiles: IUserProfileRdo[];
  isHaveMoreUsersProfiles: boolean;

  isFetchDetailUserProfileExecuting: boolean;
  isFetchDetailUserProfileError: boolean;
  detailUserProfile: IDetailUserProfileRdo | null;
}
