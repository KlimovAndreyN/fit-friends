import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { AppRoute, PageTitle } from '../../const';

function NotFound(): JSX.Element {
  //! проверить оформление className!
  return (
    <main className="page-content">
      <Helmet>
        <title>{PageTitle.NotFound}</title>
      </Helmet>
      <div className="container">
        <section className="error">
          <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
          <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
          <Link to={AppRoute.Root}>На главную</Link>
        </section>
      </div>
    </main>
  );
}

export default NotFound;
