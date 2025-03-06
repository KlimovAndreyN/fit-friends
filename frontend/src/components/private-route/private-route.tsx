import { Navigate } from 'react-router-dom';

import Spinner from '../spinner/spinner';

//!import { useAppSelector } from '../../hooks';
//!import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({ children, restrictedFor, redirectTo }: PrivateRouteProps): JSX.Element {
  //!const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorizationStatus = AuthorizationStatus.Auth;
  //const authorizationStatus = AuthorizationStatus.NoAuth;
  //const authorizationStatus = AuthorizationStatus.Unknown;

  //! временно
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
