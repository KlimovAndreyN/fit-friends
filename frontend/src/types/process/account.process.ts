import { IAccountInfoRdo, ICertificateRdo } from '@backend/shared/core';

export type AccountProcess = {
  isExistQuestionnaireExecuting: boolean;
  existQuestionnaire: boolean;

  isCreateQuestionnaireExecuting: boolean;

  isFetchAccountInfoExecuting: boolean;
  accountInfo: IAccountInfoRdo | null;
  coachCertificates: ICertificateRdo[];

  isUpdateAccountInfoExecuting: boolean;
  isUpdateAccountInfoError: boolean;

  isUpdateCoachCertificatesExecuting: boolean;
  isUpdateCoachCertificatesError: boolean;

  isReadyForTrainingChangeExecuting: boolean;
  readyForTraining: boolean;
}
