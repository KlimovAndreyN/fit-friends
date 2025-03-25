import { History } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, IUserInfoRdo } from '@backend/shared';

type Extra = {
  api: AxiosInstance;
  history: History; //! пригодилось?
};

export const Action = {
  GET_USER_INFO: 'user-info/get-user-info'
};

export const fetchUserInfo = createAsyncThunk<IUserInfoRdo, undefined, { extra: Extra }>(
  Action.GET_USER_INFO,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IUserInfoRdo>(ApiServiceRoute.UserInfo);

    return data;
  }
);
