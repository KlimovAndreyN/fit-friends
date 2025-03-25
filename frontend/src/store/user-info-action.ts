import { History } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiServiceRoute, IUserInfoRdo, UserInfoRoute } from '@backend/shared';

import { joinUrl } from '../utils/common';

type Extra = {
  api: AxiosInstance;
  history: History; //! пригодилось?
};

export const Action = {
  GET_USER_INFO: 'user-info/get-user-info',
  CHANGE_READY: 'user-info/change-ready'
};

export const fetchUserInfo = createAsyncThunk<IUserInfoRdo, undefined, { extra: Extra }>(
  Action.GET_USER_INFO,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<IUserInfoRdo>(ApiServiceRoute.UserInfo);

    return data;
  }
);

export const changeReadyForTraning = createAsyncThunk<boolean, boolean, { extra: Extra }>(
  Action.CHANGE_READY,
  async (ready, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UserInfo, UserInfoRoute.ReadyForTraining);

    if (ready) {
      await api.post(url);
    } else {
      await api.delete(url);
    }

    return ready;
  }
);
