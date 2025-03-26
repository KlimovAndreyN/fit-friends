import { IUserInfoRdo } from '@backend/shared';

export type UserInfoProcess = {
  isExistQuestionnaireExecuting: boolean;
  isCreateQuestionnaireExecuting: boolean;
  isFetchUserInfoExecuting: boolean;
  isUpdateUserInfoExecuting: boolean;
  isReadyForTrainingChangeExecuting: boolean;
  existQuestionnaire: boolean;
  userInfo: IUserInfoRdo | null;
  readyForTraining?: boolean;
}
