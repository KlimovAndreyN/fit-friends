import { MouseEvent } from 'react';

import { useAppDispatch } from '../../hooks';
import { logoutUser } from '../../store/action';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOutClick = (event: MouseEvent) => {
    //! дополнительный функционал
    event.preventDefault();

    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <a className="main-nav__link is-active" href="#" aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#" aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#" aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </a>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <a className="main-nav__link" href="#" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </a>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="#">
                      <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                      <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time>
                    </a>
                  </li>
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="#">
                      <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                      <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time>
                    </a>
                  </li>
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="#">
                      <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                      <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time>
                    </a>
                  </li>
                  {/*
                   //!
                  <!--<li className="main-nav__subitem"><a className="notification" href="#">
                    <p className="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                    <time className="notification__time" dateTime="2023-12-14 08:15">14 декабря, 08:15</time></a>
                  </li>-->
                  */}
                </ul>
              </div>
            </li>
            {/*
            //! ссылка для выхода
            */}
            <li className="main-nav__item">
              <a className="main-nav__link" href="" onClick={handleSignOutClick} aria-label="Выход">
                <svg width="16px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z" fill="#000000" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
              <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
              <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
