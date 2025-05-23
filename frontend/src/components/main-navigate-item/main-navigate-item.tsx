import { JSX, Fragment, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type MainNavigateItemProps = {
  title: string;
  linkTo?: string;
  isActive?: boolean;
  onLinkClick?: () => void;
  svg: JSX.Element;
  children?: JSX.Element;
}

function MainNavigateItem({ title, linkTo, onLinkClick, svg, children, isActive }: MainNavigateItemProps): JSX.Element {
  const { pathname } = useLocation();
  const currentIsActive = isActive || (pathname === linkTo);
  const linkClassName = classNames('main-nav__link', { 'is-active': currentIsActive });
  const listItemClassName = classNames('main-nav__item', { 'main-nav__item--notifications': !!children });

  const handleLinkClick = (event: MouseEvent) => {
    event.preventDefault();

    onLinkClick?.();
  };

  return (
    <li className={listItemClassName}>
      {
        linkTo
          ?
          <Link className={linkClassName} to={linkTo} aria-label={title}>
            {svg}
          </Link>
          :
          <Fragment>
            <a className={linkClassName} href="" onClick={handleLinkClick} aria-label={title}>
              {svg}
            </a>
            {children}
          </Fragment>
      }
    </li>
  );
}

export default MainNavigateItem;
