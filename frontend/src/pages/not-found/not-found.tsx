import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

import { AppRoute, PageTitle } from '../../const';

function NotFound(): JSX.Element {
  return (
    <Fragment>
      <Header title={PageTitle.NotFound} />
      <main>
        <div className="container intro__wrapper">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>404 - Страница не найдена!</h1>
          <br />
          <h2>Возможно, страница была удалена или</h2>
          <h2>её вовсе не существовало.</h2>
          <br />
          <h1><Link className='intro__link' to={AppRoute.Root}>На главную</Link></h1>
        </div>
      </main>
    </Fragment>
  );
}

export default NotFound;
