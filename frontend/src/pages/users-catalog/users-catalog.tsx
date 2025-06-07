import { JSX, Fragment } from 'react';

import Header from '../../components/header/header';
import Users from '../../components/users/users';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { PageTitle } from '../../const';

function UsersCatalog(): JSX.Element {
  useScrollToTop(); //! а если в useEffect? в Users

  return (
    <Fragment>
      <Header title={PageTitle.UsersCatalog} />
      <main>
        <section className="inner-page">
          <div className="container">
            <Users />
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default UsersCatalog;
