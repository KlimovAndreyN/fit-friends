import { State } from '../../types/state';
import { UserInfoProcess } from '../../types/user-info-process';
import { StoreSlice } from '../../const';

export const getIsExistQuestionnaireExecuting = ({ [StoreSlice.UserInfoProcess]: USER_PROCESS }: State): UserInfoProcess['isExistQuestionnaireExecuting'] => USER_PROCESS.isExistQuestionnaireExecuting;
export const getIsCreateQuestionnaireExecuting = ({ [StoreSlice.UserInfoProcess]: USER_PROCESS }: State): UserInfoProcess['isCreateQuestionnaireExecuting'] => USER_PROCESS.isCreateQuestionnaireExecuting;
export const getIsFetchUserInfoExecuting = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['isFetchUserInfoExecuting'] => USER_INFO_PROCESS.isFetchUserInfoExecuting;
export const getIsUpdateUserInfoExecuting = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['isUpdateUserInfoExecuting'] => USER_INFO_PROCESS.isUpdateUserInfoExecuting;
export const getIsReadyForTrainingChangeExecuting = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['isReadyForTrainingChangeExecuting'] => USER_INFO_PROCESS.isReadyForTrainingChangeExecuting;
export const getExistQuestionnaire = ({ [StoreSlice.UserInfoProcess]: USER_PROCESS }: State): UserInfoProcess['existQuestionnaire'] => USER_PROCESS.existQuestionnaire;
export const getUserInfo = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['userInfo'] => USER_INFO_PROCESS.userInfo;
export const getReadyForTraining = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['readyForTraining'] => USER_INFO_PROCESS.readyForTraining;
