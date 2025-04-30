import { ICertificateRdo, IDetailUserProfileRdo } from '@backend/shared/core';

export type AccountProcess = {
  isExistQuestionnaireExecuting: boolean;
  existQuestionnaire: boolean;

  isCreateQuestionnaireExecuting: boolean;

  isFetchAccountExecuting: boolean;
  account: IDetailUserProfileRdo | null;
  coachCertificates: ICertificateRdo[];

  isUpdateAccountExecuting: boolean;
  isUpdateAccountError: boolean;

  isUpdateCoachCertificatesExecuting: boolean;

  isReadyForTrainingChangeExecuting: boolean;
  readyForTraining: boolean;
}
