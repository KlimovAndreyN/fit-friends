import { Navigate } from 'react-router-dom';

import MainSpinner from '../main-spinner/main-spinner';

import { AuthorizationStatus } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({ children, restrictedFor, redirectTo }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <MainSpinner />;
  }

  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
