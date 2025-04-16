import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import Profile from '../../pages/profile/profile';
import Friends from '../../pages/friends/friends';
import UserDetail from '../../pages/user-detail/user-detail';
import TrainingCatalog from '../../pages/training-catalog/training-catalog';
import Training from '../../pages/training/training';
import MyOrders from '../../pages/my-orders/my-orders';
import MyPurchases from '../../pages/my-purchases/my-purchases';
import NotFound from '../../pages/not-found/not-found';

import { useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { isCoachRole } from '../../utils/common';
import { AuthorizationStatus } from '../../types/types';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  //! возможно ли единожды проверить заполенность опросника и не делать QuestionnaireRoute?

  const userRole = useAppSelector(getUserRole);
  const noAuthRedirectTo = isCoachRole(userRole) ? AppRoute.Profile : AppRoute.Index;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Index}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.Profile}>
                    <Index />
                  </RoleRoute>
                </QuestionnaireRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Intro}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.NoAuth} redirectTo={noAuthRedirectTo}>
                <Intro />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.SignIn}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.NoAuth} redirectTo={noAuthRedirectTo}>
                <SignIn />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.SignUp}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.NoAuth} redirectTo={noAuthRedirectTo}>
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
            path={AppRoute.Profile}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <Profile />
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
            path={AppRoute.TrainingCatalog}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.Profile}>
                    <TrainingCatalog />
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
                  <Training />
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
            path={AppRoute.MyPurchases}
            element={
              <PrivateRoute allowedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <RoleRoute allowedFor={Role.Sportsman} redirectTo={AppRoute.Profile}>
                    <MyPurchases />
                  </RoleRoute>
                </QuestionnaireRoute>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
