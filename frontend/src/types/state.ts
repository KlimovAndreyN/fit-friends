import store from '../store';
import { User } from './backend';
import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userName: User['name'];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
