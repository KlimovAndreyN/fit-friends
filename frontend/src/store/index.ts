import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../api';
import { history } from '../history';
import { rootReducer } from './root-reducer';
import { fetchUserStatus } from './actions/user-action';

const api = createAPI();
const thunk = { extraArgument: { api, history } };
const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk })
  }
);

store.dispatch(fetchUserStatus());

export default store;
