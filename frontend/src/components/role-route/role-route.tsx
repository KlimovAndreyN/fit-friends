import { Navigate } from 'react-router-dom';

import { Role } from '@backend/shared/core';

import NotFound from '../../pages/not-found/not-found';

import { useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';

type RoleRouteProps = {
  allowedFor: Role;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function RoleRoute({ allowedFor, redirectTo, children }: RoleRouteProps): JSX.Element {
  const userRole = useAppSelector(getUserRole);

  if (!userRole) {
    //! проверить как будет выглядеть
    //! еще бы дополнительный текст добавить или компонент с ошибкой!
    return <NotFound />;
  }

  return (
    (userRole === allowedFor)
      ? children
      : <Navigate to={redirectTo} />
  );
}

export default RoleRoute;
