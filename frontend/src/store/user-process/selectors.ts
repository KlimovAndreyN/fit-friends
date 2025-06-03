import { isCoachRole } from '@backend/shared/core';

import { State } from '../../types/state';
import { UserProcess } from '../../types/process/user.process';
import { AppRoute, StoreSlice } from '../../const';

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['authorizationStatus'] => USER_PROCESS.authorizationStatus;
export const getIsSingInExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isSingInExecuting'] => USER_PROCESS.isSingInExecuting;
export const getIsSingUpExecuting = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isSingUpExecuting'] => USER_PROCESS.isSingUpExecuting;
export const getUserId = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['userInfo']['sub'] => USER_PROCESS.userInfo.sub;
export const getUserRole = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['userInfo']['role'] => USER_PROCESS.userInfo.role;
export const getUserMainPage = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): AppRoute => (isCoachRole(USER_PROCESS.userInfo.role) ? AppRoute.PersonalAccount : AppRoute.Index);

export const getPrevLocation = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['prevLocation'] => USER_PROCESS.prevLocation;

export const getIsIndexPageActivate = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserProcess['isIndexPageActivate'] => USER_PROCESS.isIndexPageActivate;
