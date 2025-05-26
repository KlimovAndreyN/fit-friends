import { IDetailUserProfileRdo, IUserProfileRdo, IUserQuery } from '@backend/shared/core';

export type UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: boolean;
  lookForCompanyUserProfiles: IUserProfileRdo[];

  usersFilter: IUserQuery;
  isFristPage: boolean;
  isUsersFilterActivate: boolean; //! возможно тут лишнее т.к. для тренировок была максимальная цена
  isFetchUsersExecuting: boolean;
  users: IUserProfileRdo[];
  isHaveMoreUsers: boolean;

  isFetchDetailUserProfileExecuting: boolean;
  isFetchDetailUserProfileError: boolean;
  detailUserProfile: IDetailUserProfileRdo | null;
}
