import { Fragment, JSX } from 'react';

import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';
import ThumbnailFriend from '../thumbnail-friend/thumbnail-friend';

import { useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { MOCK_FRIENDS } from '../../const';


type FriendsListProps = {
  className: string;
}

function FriendsList({ className }: FriendsListProps): JSX.Element {
  //! проверить консоль браузера на ошибки
  //! вызвать в useEffect dispatch clearDetailUserProfile + setPrevLocation
  //! если нет друзей - вывести текст 'У вас еще нет друзей'

  const userRole = useAppSelector(getUserRole);
  const friends = MOCK_FRIENDS;
  const isHaveMoreData = true;
  //const isHaveMoreData = false;

  const handleShowMoreClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleShowMoreClick');
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
        onShowMoreClick={handleShowMoreClick}
      />
    </Fragment>
  );
}

export default FriendsList;
