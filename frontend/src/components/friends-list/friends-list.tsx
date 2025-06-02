import { Fragment, JSX, useEffect } from 'react';

import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';
import ThumbnailFriend from '../thumbnail-friend/thumbnail-friend';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { fetchFriends } from '../../store/actions/user-profile-action';
import { getFriends, getIsFetchFriendsExecuting, getIsHaveMoreFriends } from '../../store/user-profile-process/selectors';

type FriendsListProps = {
  className: string;
}

function FriendsList({ className }: FriendsListProps): JSX.Element {
  //! проверить консоль браузера на ошибки
  //! вызвать в useEffect dispatch clearDetailUserProfile + setPrevLocation
  //! если нет друзей - вывести текст 'У вас еще нет друзей'

  const dispatch = useAppDispatch();
  const userRole = useAppSelector(getUserRole);
  const isFetchFriendsExecuting = useAppSelector(getIsFetchFriendsExecuting);
  const friends = useAppSelector(getFriends);
  const isHaveMoreData = useAppSelector(getIsHaveMoreFriends);

  useEffect(() => {
    //! временно
    dispatch(fetchFriends({ page: 1, limit: 6 }));
  }, [dispatch]);

  const handleShowMoreClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleShowMoreClick');

    //! временно
    dispatch(fetchFriends({ page: 2, limit: 6 }));
  };

  if (!friends.length) {
    return (
      <Fragment>
        <br />
        <br />
        <h2 style={{ textAlign: 'center' }}>У вас еще нет друзей</h2>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ul className={`${className}__list`}>
        {
          friends.map((friend) => (
            <ThumbnailFriend
              key={friend.id}
              className={className}
              friend={friend}
              userRole={userRole}
            />))
        }
      </ul>
      <ButtonsShowMoreAndToTop
        divClassNamePrefix={className}
        isHaveMoreData={isHaveMoreData}
        disabled={isFetchFriendsExecuting}
        onShowMoreClick={handleShowMoreClick}
      />
    </Fragment>
  );
}

export default FriendsList;
