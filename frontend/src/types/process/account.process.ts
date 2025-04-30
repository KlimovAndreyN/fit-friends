import { ICertificateRdo, IDetailUserProfileRdo, IUserProfileRdo } from '@backend/shared/core';

export type AccountProcess = {
  isExistQuestionnaireExecuting: boolean;
  existQuestionnaire: boolean;

  isCreateQuestionnaireExecuting: boolean;

  isFetchUserProfileExecuting: boolean;
  userProfile: IDetailUserProfileRdo | null;
  coachCertificates: ICertificateRdo[];

  isUpdateUserProfileExecuting: boolean;
  isUpdateUserProfileError: boolean;

  isUpdateCoachCertificatesExecuting: boolean;

  isReadyForTrainingChangeExecuting: boolean;
  readyForTraining: boolean;

  isFetchLookForCompanyUserProfilesExecuting: boolean;
  lookForCompanyUserProfiles: IUserProfileRdo[];

  isFetchUserProfilesExecuting: boolean;
  userProfiles: IUserProfileRdo[];
}
