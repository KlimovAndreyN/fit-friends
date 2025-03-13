import { Helmet } from 'react-helmet-async';
import { MouseEvent } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

import { useAppDispatch } from '../../hooks';
import { logoutUser } from '../../store/action';
import { PageTitle } from '../../const';

function Index(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOutClick = (event: MouseEvent) => {
    //! дополнительный функционал
    event.preventDefault();

    dispatch(logoutUser());
  };

  return (
    <>
      <Helmet>
        <title>{PageTitle.Index}</title>
      </Helmet>
      <Header />
      <div>Index</div>
      <a className="main-nav__link" onClick={handleSignOutClick} aria-label="Выход">
        <svg width="16px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z" fill="#000000" /></svg>
      </a>
      <Footer />
    </>
  );
}

export default Index;
