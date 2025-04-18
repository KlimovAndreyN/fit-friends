import { Fragment } from 'react';

import Header from '../../components/header/header';
import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

import { PageTitle } from '../../const';

function UsersCatalog(): JSX.Element {
  //! временно

  return (
    <Fragment>
      <Header title={PageTitle.UsersCatalog} />
      <h1>{PageTitle.UsersCatalog}</h1>
      <ThumbnailSpecGym />
    </Fragment>
  );
}

export default UsersCatalog;
