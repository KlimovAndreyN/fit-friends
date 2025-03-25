import { State } from '../../types/state';
import { UserProcess } from '../../types/user-process';
import { StoreSlice } from '../../const';

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['authorizationStatus'] => USER_PROCESS.authorizationStatus;
export const getIsSingInExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isSingInExecuting'] => USER_PROCESS.isSingInExecuting;
export const getIsSingUpExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isSingUpExecuting'] => USER_PROCESS.isSingUpExecuting;
export const getUserRole = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['userRole'] => USER_PROCESS.userRole;
