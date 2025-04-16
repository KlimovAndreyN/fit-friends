import MainNavigateItem from '../main-navigate-item/main-navigate-item';
import MainNavigateNotifications from '../main-navigate-notifications/main-navigate-notifications';

import { useAppDispatch } from '../../hooks';
import { logoutUser } from '../../store/actions/user-action';
import { AppRoute } from '../../const';

const SvgOption = {
  HOME: <svg width="18" height="18" aria-hidden="true"><use xlinkHref="#icon-home"></use></svg>,
  PERSONAL_ACCOUNT: <svg width="16" height="18" aria-hidden="true"><use xlinkHref="#icon-user"></use></svg>,
  FRIENDS_LIST: <svg width="22" height="16" aria-hidden="true"><use xlinkHref="#icon-friends"></use></svg>,
  NOTIFICATIONS: <svg width="14" height="18" aria-hidden="true"><use xlinkHref="#icon-notification"></use></svg>,
  SIGN_OUT: <svg width="16px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z" fill="#000000" /></svg>
} as const;

function MainNavigate(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOutClick = () => {
    //! дополнительный функционал
    dispatch(logoutUser());
  };

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <MainNavigateItem title='На главную' linkTo={AppRoute.Index} svg={SvgOption.HOME} />
        <MainNavigateItem title='Личный кабинет' linkTo={AppRoute.Profile} svg={SvgOption.PERSONAL_ACCOUNT} />
        <MainNavigateItem title='Друзья' linkTo={AppRoute.Friends} svg={SvgOption.FRIENDS_LIST} />
        <MainNavigateItem title='Уведомления' svg={SvgOption.NOTIFICATIONS}>
          <MainNavigateNotifications />
        </MainNavigateItem>
        {/*//! ссылка для выхода*/}
        <MainNavigateItem title='Выход' onLinkClick={handleSignOutClick} svg={SvgOption.SIGN_OUT} />
      </ul>
    </nav>
  );
}

export default MainNavigate;
