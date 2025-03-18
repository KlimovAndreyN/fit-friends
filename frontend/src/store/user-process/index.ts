import { createSlice } from '@reduxjs/toolkit';

import { UserProcess } from '../../types/user-process';
import { AuthorizationStatus } from '../../types/types';
import { fetchUserStatus, loginUser, logoutUser, registerUser } from '../action';
import { StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null
};

export const userProcess = createSlice(
  {
    name: StoreSlice.UserProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          fetchUserStatus.fulfilled,
          (state, action) => {
            state.userInfo = action.payload;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          fetchUserStatus.rejected,
          (state) => {
            state.userInfo = null;
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          loginUser.fulfilled,
          (state, action) => {
            state.userInfo = action.payload;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          logoutUser.fulfilled,
          (state) => {
            state.userInfo = null;
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(registerUser.fulfilled,
          () => {
            /*
            //! в state.payload положить логин и пароль? и попробовать авторизоватся или же при регистрации отдавать токены!

               const dispatch = useAppDispatch();
               const { email, password } = dto;

               dispatch(loginUser({ email, password }));
             */
          }
        );
    }
  }
);
