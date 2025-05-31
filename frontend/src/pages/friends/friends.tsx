import { JSX, Fragment } from 'react';

import Header from '../../components/header/header';
import FriendsList from '../../components/friends-list/friends-list';

import { PageTitle } from '../../const';

function Friends(): JSX.Element {
  return (
    <Fragment>
      <Header title={PageTitle.Friends} />
      <FriendsList />
    </Fragment>
  );
}

export default Friends;
