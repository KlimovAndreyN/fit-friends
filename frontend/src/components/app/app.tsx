import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from '../private-route/private-route';
import Index from '../../pages/index/index';
import Intro from '../../pages/intro/intro';
import SignIn from '../../pages/sign-in/sign-in';
import Register from '../../pages/sign-up/sign-up';
import NotFound from '../../pages/not-found/not-found';

import { AuthorizationStatus } from '../../types/types';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
                <Index />
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
                <Register />
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
