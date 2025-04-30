import { IDetailUserProfileRdo, IUserProfileRdo } from '@backend/shared/core';

export type UserProfileProcess = {
  isFetchLookForCompanyUserProfilesExecuting: boolean;
  lookForCompanyUserProfiles: IUserProfileRdo[];

  isFetchUserProfilesExecuting: boolean;
  userProfiles: IUserProfileRdo[];

  isFetchDetailUserProfileExecuting: boolean;
  isFetchDetailUserProfileError: boolean;
  detailUserProfile: IDetailUserProfileRdo | null;
}
