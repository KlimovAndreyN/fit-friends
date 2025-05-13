import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import MainSpinner from '../main-spinner/main-spinner';

import { AuthorizationStatus } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  allowedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({ children, allowedFor, redirectTo }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <MainSpinner />;
  }

  return (
    (authorizationStatus === allowedFor)
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
