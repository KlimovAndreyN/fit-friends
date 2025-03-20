import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from '../private-route/private-route';
import Index from '../../pages/index/index';
import Intro from '../../pages/intro/intro';
import SignIn from '../../pages/sign-in/sign-in';
import SignUp from '../../pages/sign-up/sign-up';
import Questionnaire from '../../pages/questionnaire/questionnaire';
import PersonalAccount from '../../pages/personal-account/personal-account';
import FriendsList from '../../pages/friends-list/friends-list';
import NotFound from '../../pages/not-found/not-found';

import { useAppSelector } from '../../hooks';
import { getExistQuestionnaire } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../types/types';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  const existQuestionnaire = useAppSelector(getExistQuestionnaire);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                {
                  (!existQuestionnaire)
                    ? <Navigate to={AppRoute.Questionnaire} />
                    : <Index />
                }
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Intro}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
                <Intro />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.SignIn}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
                <SignIn />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.SignUp}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Questionnaire}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                {
                  (existQuestionnaire)
                    ? <Navigate to={AppRoute.Root} />
                    : <Questionnaire />
                }
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.PersonalAccount}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                {
                  (!existQuestionnaire)
                    ? <Navigate to={AppRoute.Questionnaire} />
                    : <PersonalAccount />
                }
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.FriendsList}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                {
                  (existQuestionnaire)
                    ? <Navigate to={AppRoute.Root} />
                    : <FriendsList />
                }
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
