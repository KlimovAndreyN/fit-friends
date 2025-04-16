import { Fragment } from 'react';

import Header from '../../components/header/header';

import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

function UserDetail(): JSX.Element {
  //! заголовок в константы
  //! временно

  return (
    <Fragment>
      <Header title={'Пользователь'} />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <ThumbnailSpecGym />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default UserDetail;
