import { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../../const';

const LOGO_SVG = <svg width="187" height="70" aria-hidden="true"><use xlinkHref="#logo" /></svg>;

function Logo(): JSX.Element {
  const location = useLocation();
  const activeLink = location.pathname !== AppRoute.Index;

  return (activeLink
    ?
    <Link className="header__logo" to={AppRoute.Index} aria-label="Переход на главную">
      {LOGO_SVG}
    </Link>
    :
    <span className="header__logo">
      {LOGO_SVG}
    </span>
  );
}

export default Logo;
