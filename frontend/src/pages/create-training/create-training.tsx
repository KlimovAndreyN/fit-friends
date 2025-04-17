import { Fragment } from 'react';

import Header from '../../components/header/header';
import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

import { PageTitle } from '../../const';

function CreateTraining(): JSX.Element {
  //! временно

  return (
    <Fragment>
      <Header title={PageTitle.CreateTraining} />
      <h1>{PageTitle.CreateTraining}</h1>
      <ThumbnailSpecGym />
    </Fragment>
  );
}

export default CreateTraining;
