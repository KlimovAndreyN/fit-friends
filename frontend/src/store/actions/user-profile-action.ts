import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserProfileRdo, IDetailUserProfileRdo, UserProfileRoute, ApiServiceRoute } from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

type Extra = {
  api: AxiosInstance;
};

export const Action = {
  FETCH_LOOK_FOR_COMPANY_USERS_PROFILES: 'user-profile/fetch-look-for-company-users-profiles',
  FETCH_USERS_PROFILES: 'user-profile/fetch-users-profiles',
  FETCH_USER_PROFILE: 'user-profile/fetch-user-profile'
};

export const fetchLookForCompanyUserProfiles = createAsyncThunk<IUserProfileRdo[], undefined, { extra: Extra }>(
  Action.FETCH_LOOK_FOR_COMPANY_USERS_PROFILES,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UsersProfiles, UserProfileRoute.LookForCompany);
    const { data } = await api.get<IUserProfileRdo[]>(url);

    return data;
  }
);

export const fetchUserProfiles = createAsyncThunk<IUserProfileRdo[], undefined, { extra: Extra }>(
  Action.FETCH_USERS_PROFILES,
  async (_, { extra }) => {
    const { api } = extra;
    const url = joinUrl(ApiServiceRoute.UsersProfiles, UserProfileRoute.LookForCompany);
    //! временно, заготовка!
    const { data } = await api.get<IUserProfileRdo[]>(url);
    // eslint-disable-next-line no-console
    console.log('fetchUserProfiles', data);

    return [];//! временно, заготовка!
  }
);

export const fetchDetailUserProfile = createAsyncThunk<IDetailUserProfileRdo, string, { extra: Extra }>(
  Action.FETCH_USER_PROFILE,
  async (userId, { extra }) => {
    const { api } = extra;
    //! отладка
    // eslint-disable-next-line no-console
    console.log('fetchDetailUserProfile - userId', userId);

    const { data } = await api.get<IDetailUserProfileRdo>(ApiServiceRoute.UsersProfiles); //! нужен по id

    return data;
  }
);
