import { IDetailUserProfileRdo, IUserProfileRdo } from '@backend/shared/core';

export type UserProfileProcess = {
  isExistQuestionnaireExecuting: boolean;
  isCreateQuestionnaireExecuting: boolean;
  isFetchUserProfileExecuting: boolean;
  isUpdateUserProfileExecuting: boolean;
  isUpdateUserProfileError: boolean;
  isReadyForTrainingChangeExecuting: boolean;
  existQuestionnaire: boolean;
  userProfile: IDetailUserProfileRdo | null;
  readyForTraining?: boolean;
  isFetchLookForCompanyUserProfilesExecuting: boolean;
  lookForCompanyUserProfiles: IUserProfileRdo[];
  isFetchUserProfilesExecuting: boolean;
  userProfiles: IUserProfileRdo[];
}
