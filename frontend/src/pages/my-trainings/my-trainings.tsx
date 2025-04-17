import { Fragment } from 'react';

import Header from '../../components/header/header';
import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

import { PageTitle } from '../../const';

function MyTrainings(): JSX.Element {
  //! временно

  return (
    <Fragment>
      <Header title={PageTitle.MyTrainings} />
      <h1>{PageTitle.MyTrainings}</h1>
      <ThumbnailSpecGym />
    </Fragment>
  );
}

export default MyTrainings;
