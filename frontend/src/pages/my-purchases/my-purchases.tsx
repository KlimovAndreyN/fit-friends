import { JSX, Fragment } from 'react';

import Header from '../../components/header/header';
import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

import { PageTitle } from '../../const';

function MyPurchases(): JSX.Element {
  //! временно

  return (
    <Fragment>
      <Header title={PageTitle.MyPurchases} />
      <h1>{PageTitle.MyPurchases}</h1>
      <ThumbnailSpecGym />
    </Fragment>
  );
}

export default MyPurchases;
