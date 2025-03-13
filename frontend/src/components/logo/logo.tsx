import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type LogoProps = {
  isActiveLink: boolean;
}

const logoSvg = <svg width="187" height="70" aria-hidden="true"><use xlinkHref="#logo"></use></svg>;

function Logo({ isActiveLink }: LogoProps): JSX.Element {

  return (isActiveLink
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
