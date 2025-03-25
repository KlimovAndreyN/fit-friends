import { State } from '../../types/state';
import { UserInfoProcess } from '../../types/user-info-process';
import { StoreSlice } from '../../const';

export const getIsFetchUserInfoExecuting = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['isFetchUserInfoExecuting'] => USER_INFO_PROCESS.isFetchUserInfoExecuting;
export const getIsReadyForTrainingChangeExecuting = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['isReadyForTrainingChangeExecuting'] => USER_INFO_PROCESS.isReadyForTrainingChangeExecuting;
export const getUserInfo = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['userInfo'] => USER_INFO_PROCESS.userInfo;
export const getReadyForTraining = ({ [StoreSlice.UserInfoProcess]: USER_INFO_PROCESS }: State): UserInfoProcess['readyForTraining'] => USER_INFO_PROCESS.readyForTraining;
