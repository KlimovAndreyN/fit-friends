import { Fragment } from 'react';

import Header from '../../components/header/header';
import ThumbnailSpecGym from '../../components/thumbnail-spec-gym/thumbnail-spec-gym';

import { PageTitle } from '../../const';

function MyOrders(): JSX.Element {
  //! временно

  return (
    <Fragment>
      <Header title={PageTitle.MyOrders} />
      <h1>{PageTitle.MyOrders}</h1>
      <ThumbnailSpecGym />
    </Fragment>
  );
}

export default MyOrders;
