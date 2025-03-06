import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from '../private-route/private-route';
import Header from '../header/header';
import Footer from '../footer/footer';
import Index from '../../pages/index/index';
import Intro from '../../pages/intro/intro';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import NotFound from '../../pages/not-found/not-found';

import { AppRoute, AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Header />
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
            path={AppRoute.Login}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Register}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
                <Register />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/*</HistoryRouter>*/}
    </HelmetProvider>
  );
}

export default App;
