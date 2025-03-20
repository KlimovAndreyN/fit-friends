import { State } from '../../types/state';
import { UserProcess } from '../../types/user-process';
import { StoreSlice } from '../../const';

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['authorizationStatus'] => USER_PROCESS.authorizationStatus;
export const getIsSingInExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isSingInExecuting'] => USER_PROCESS.isSingInExecuting;
export const getIsSingUpExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isSingUpExecuting'] => USER_PROCESS.isSingUpExecuting;
export const getIsQuestionnaireInExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isQuestionnaireExecuting'] => USER_PROCESS.isQuestionnaireExecuting;
//!export const getUserInfo = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['userInfo'] => USER_PROCESS.userInfo;
export const getExistQuestionnaire = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['existQuestionnaire'] => USER_PROCESS.existQuestionnaire;
export const getUserRole = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['userRole'] => USER_PROCESS.userRole;
