import { Fragment } from 'react';

import Header from '../../components/header/header';
import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

import { PageTitle } from '../../const';

function UserDetail(): JSX.Element {
  //! временно

  return (
    <Fragment>
      <Header title={PageTitle.UserDetail} />
      <h1>{PageTitle.UserDetail}</h1>
      <ThumbnailSpecGym />
    </Fragment>
  );
}

export default UserDetail;
