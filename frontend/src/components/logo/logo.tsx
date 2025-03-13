import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../../const';

const logoSvg = <svg width="187" height="70" aria-hidden="true"><use xlinkHref="#logo"></use></svg>;

function Logo(): JSX.Element {
  const location = useLocation();
  const activeLink = location.pathname !== AppRoute.Root;

  return (activeLink
    ?
    <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
      {logoSvg}
    </Link>
    :
    <span className="header__logo">
      {logoSvg}
    </span>
  );
}

export default Logo;
