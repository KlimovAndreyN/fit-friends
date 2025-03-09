import type { State } from '../../types/state';
import { User } from '../../types/backend';
import { AuthorizationStatus } from '../../types/types';
import { StoreSlice } from '../../const';

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): AuthorizationStatus => USER_PROCESS.authorizationStatus;
export const getIsAuthorized = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): boolean => USER_PROCESS.authorizationStatus === AuthorizationStatus.Auth;
export const getUserName = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): User['name'] => USER_PROCESS.userName;
