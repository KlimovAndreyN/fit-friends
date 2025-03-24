import { createSlice } from '@reduxjs/toolkit';

import { IUserInfoRdo, MetroStationName, Specialization, UserGender, UserLevel, UserRole } from '@backend/shared';

import { UserProcess } from '../../types/user-process';
import { AuthorizationStatus } from '../../types/types';
import { createQuestionnaire, existQuestionnaire, fetchUserStatus, loginUser, logoutUser, registerUser } from '../user-action';
import { StoreSlice } from '../../const';

const EMPTY_USER_INFO: IUserInfoRdo = {
  //! отладка
  //name: '',
  name: 'Валерия',
  avatarPath: '',
  about: 'asdas asd asd asdas asd asd',
  //avatarPath: '/img/content/user-photo-1.png',
  gender: UserGender.NotMatter,
  level: UserLevel.Beginner,
  metroStationName: MetroStationName.Petrogradskaya,
  specializations: [Specialization.Aerobics],
  ready: false
};

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isSingInExecuting: false,
  isSingUpExecuting: false,
  isExistQuestionnaireExecuting: false,
  isCreateQuestionnaireExecuting: false,
  isFetchUserInfoExecuting: false,
  existQuestionnaire: false,
  userRole: UserRole.Sportsman,
  userInfo: EMPTY_USER_INFO
};

export const userProcess = createSlice(
  {
    name: StoreSlice.UserProcess,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(
          existQuestionnaire.pending,
          (state) => {
            state.isExistQuestionnaireExecuting = true;
          }
        )
        .addCase(
          existQuestionnaire.rejected,
          (state) => {
            state.isExistQuestionnaireExecuting = false;
          }
        )
        .addCase(
          existQuestionnaire.fulfilled,
          (state, action) => {
            state.existQuestionnaire = action.payload;
            state.isExistQuestionnaireExecuting = false;
          }
        )
        .addCase(
          fetchUserStatus.rejected,
          (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          fetchUserStatus.fulfilled,
          (state, action) => {
            state.userRole = action.payload.role;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          loginUser.pending,
          (state) => {
            state.isSingInExecuting = true;
          }
        )
        .addCase(
          loginUser.rejected,
          (state) => {
            state.isSingInExecuting = false;
          }
        )
        .addCase(
          loginUser.fulfilled,
          (state, action) => {
            state.isSingInExecuting = false;
            state.userRole = action.payload.role;
            state.authorizationStatus = AuthorizationStatus.Auth;
          }
        )
        .addCase(
          logoutUser.pending, //! перепроверить - сразу выйти и удалить
          //! перепроверить - logoutUser.rejected, //! перепроверить - выход после отображения ошибоки удаления
          (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          logoutUser.fulfilled, //! перепроверить - выход после отображения ошибоки удаления
          (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
          }
        )
        .addCase(
          registerUser.pending,
          (state) => {
            state.isSingUpExecuting = true;
          }
        )
        .addCase(
          registerUser.rejected,
          (state) => {
            state.isSingUpExecuting = false;
          }
        )
        .addCase(
          registerUser.fulfilled,
          (state) => {
            state.isSingUpExecuting = false;
          }
        )
        .addCase(
          createQuestionnaire.pending,
          (state) => {
            state.isCreateQuestionnaireExecuting = true;
          }
        )
        .addCase(
          createQuestionnaire.rejected,
          (state) => {
            state.isCreateQuestionnaireExecuting = false;
          }
        )
        .addCase(
          createQuestionnaire.fulfilled,
          (state) => {
            state.existQuestionnaire = true;
            state.isCreateQuestionnaireExecuting = false;
          }
          /*
          //! пока нет действия
          )
          .addCase(
            fetchUserInfo.pending,
            (state) => {
              state.isFetchUserInfoExecuting = true;
            }
          )
          .addCase(
            fetchUserInfo.rejected,
            (state) => {
              state.isFetchUserInfoExecuting = false;
            }
          )
          .addCase(
            fetchUserInfo.fulfilled,
            (state) => {
              //! state.userInfo = action.payload
              state.isFetchUserInfoExecuting = false;
            }
          */
        );
    }
  }
);
