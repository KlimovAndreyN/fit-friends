import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from '../private-route/private-route';
import QuestionnaireRoute from '../questionnaire-route/questionnaire-route';
import Index from '../../pages/index/index';
import Intro from '../../pages/intro/intro';
import SignIn from '../../pages/sign-in/sign-in';
import SignUp from '../../pages/sign-up/sign-up';
import Questionnaire from '../../pages/questionnaire/questionnaire';
import PersonalAccount from '../../pages/personal-account/personal-account';
import FriendsList from '../../pages/friends-list/friends-list';
import NotFound from '../../pages/not-found/not-found';

import { AuthorizationStatus } from '../../types/types';
import { AppRoute, accessIndexForAll } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              //! отладка отображения страницы
              (accessIndexForAll)
                ?
                <Index />
                :
                <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                  <QuestionnaireRoute>
                    <Index />
                  </QuestionnaireRoute>
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
                <QuestionnaireRoute isQuestionnaire>
                  <Questionnaire />
                </QuestionnaireRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.PersonalAccount}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <PersonalAccount />
                </QuestionnaireRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.FriendsList}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <FriendsList />
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
