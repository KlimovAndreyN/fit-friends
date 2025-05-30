import { JSX } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Role } from '@backend/shared/core';

import PrivateRoute from '../private-route/private-route';
import QuestionnaireRoute from '../questionnaire-route/questionnaire-route';
import RoleRoute from '../role-route/role-route';
import Index from '../../pages/index/index';
import Intro from '../../pages/intro/intro';
import SignIn from '../../pages/sign-in/sign-in';
import SignUp from '../../pages/sign-up/sign-up';
import Questionnaire from '../../pages/questionnaire/questionnaire';
import PersonalAccount from '../../pages/personal-account/personal-account';
import UsersCatalog from '../../pages/users-catalog/users-catalog';
import UserDetail from '../../pages/user-detail/user-detail';
import Friends from '../../pages/friends/friends';
import TrainingsCatalog from '../../pages/trainings-catalog/trainings-catalog';
import TrainingDetail from '../../pages/training-detail/training-detail';
import MyPurchases from '../../pages/my-purchases/my-purchases';
import MyOrders from '../../pages/my-orders/my-orders';
import MyTrainings from '../../pages/my-trainings/my-trainings';
import CreateTraining from '../../pages/create-training/create-training';
import NotFound from '../../pages/not-found/not-found';

import { useAppSelector } from '../../hooks';
import { getUserMainPage } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../types/types';
import { AppRoute } from '../../const';

function App(): JSX.Element | null {
  //! возможно ли единожды проверить заполненность опросника и не делать QuestionnaireRoute?

  const authRedirectTo = useAppSelector(getUserMainPage);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Index}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.PersonalAccount}>
                  <Index />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Intro}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.NoAuth} redirectTo={authRedirectTo}>
              <Intro />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.NoAuth} redirectTo={authRedirectTo}>
              <SignIn />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.SignUp}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.NoAuth} redirectTo={authRedirectTo}>
              <SignUp />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Questionnaire}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute isQuestionnaire>
                <Questionnaire />
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.PersonalAccount}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <PersonalAccount />
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.UsersCatalog}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.PersonalAccount}>
                  <UsersCatalog />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.UserDetail}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <UserDetail />
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Friends}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <Friends />
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainingsCatalog}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.PersonalAccount}>
                  <TrainingsCatalog />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainingDetail}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <TrainingDetail />
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyPurchases}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.PersonalAccount}>
                  <MyPurchases />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyOrders}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Coach} redirectTo={AppRoute.Index}>
                  <MyOrders />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyTrainings}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Coach} redirectTo={AppRoute.Index}>
                  <MyTrainings />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.CreateTraining}
          element={
            <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
              <QuestionnaireRoute>
                <RoleRoute allowedFor={Role.Coach} redirectTo={AppRoute.Index}>
                  <CreateTraining />
                </RoleRoute>
              </QuestionnaireRoute>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
