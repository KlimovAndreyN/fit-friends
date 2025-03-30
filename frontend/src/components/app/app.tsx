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
import Profile from '../../pages/profile/profile';
import Friends from '../../pages/friends/friends';
import TrainingCatalog from '../../pages/training-catalog/training-catalog';
import Training from '../../pages/training/training';
import NotFound from '../../pages/not-found/not-found';

import { AuthorizationStatus } from '../../types/types';
import { AppRoute, routeAccessDebug } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Index}
            element={
              //! отладка отображения страницы
              (routeAccessDebug)
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
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Index}>
                <Intro />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.SignIn}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Index}>
                <SignIn />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.SignUp}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Index}>
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
            path={AppRoute.Profile}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <Profile />
                </QuestionnaireRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Friends}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                <QuestionnaireRoute>
                  <Friends />
                </QuestionnaireRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.TrainingCatalog}
            element={
              //! отладка отображения страницы
              (routeAccessDebug)
                ?
                <TrainingCatalog />
                :
                <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                  <QuestionnaireRoute>
                    <TrainingCatalog />
                  </QuestionnaireRoute>
                </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.TrainingDetail}
            element={
              //! отладка отображения страницы
              (routeAccessDebug)
                ?
                <Training />
                :
                <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                  <QuestionnaireRoute>
                    <Training />
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
