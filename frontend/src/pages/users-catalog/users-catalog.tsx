import { JSX, Fragment } from 'react';

import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import UsersCatalogForm from '../../components/users-catalog-form/users-catalog-form';
import UsersCatalogList from '../../components/users-catalog-list/users-catalog-list';

import { PageTitle } from '../../const';

function UsersCatalog(): JSX.Element {
  //! вызвать в useEffect dispatch clearDetailUserProfile + setPrevLocation

  // взято из - function Trainings(props: TrainingsProps):
  //! временно
  const isFetchUsersExecuting = false;
  const page = 1;
  //

  const title = PageTitle.UsersCatalog;

  return (
    <Fragment>
      <Header title={title} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
              <UsersCatalogForm
                usersFilter={{}} //! временно
                onUsersFilterChange={() => {
                  // eslint-disable-next-line no-console
                  console.log('onUsersFilterChange');
                }}
              />
              {
                (isFetchUsersExecuting && (page === 1))
                  ?
                  (<Spinner />)
                  :
                  (
                    <UsersCatalogList />
                  )
              }
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default UsersCatalog;
