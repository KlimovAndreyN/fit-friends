import { State } from '../../types/state';
import { AuthorizationStatus } from '../../types/types';
import { UserProcess } from '../../types/user-process';
import { StoreSlice } from '../../const';

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): AuthorizationStatus => USER_PROCESS.authorizationStatus;
export const getIsSingInExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): boolean => USER_PROCESS.isSingInExecuting;
export const getIsSingUpExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): boolean => USER_PROCESS.isSingUpExecuting;
export const getIsQuestionnaireInExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): boolean => USER_PROCESS.isQuestionnaireExecuting;
export const getUserInfo = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['userInfo'] => USER_PROCESS.userInfo;
