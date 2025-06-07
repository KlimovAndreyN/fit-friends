import { Fragment, JSX, useEffect } from 'react';

import Spinner from '../spinner/spinner';
import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';
import ThumbnailFriend from '../thumbnail-friend/thumbnail-friend';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrevLocation } from '../../store/user-process';
import { getUserRole } from '../../store/user-process/selectors';
import { clearDetailUserProfile } from '../../store/user-profile-process';
import { fetchFriends } from '../../store/actions/user-profile-action';
import { getFriends, getIsFetchFriendsExecuting, getIsHaveMoreFriends, getPageFriends } from '../../store/user-profile-process/selectors';
import { AppRoute } from '../../const';

const DEFAULT_LIMIT = 6;

type FriendsListProps = {
  className: string;
}

function FriendsList({ className }: FriendsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(getUserRole);
  const isFetchFriendsExecuting = useAppSelector(getIsFetchFriendsExecuting);
  const friends = useAppSelector(getFriends);
  const page = useAppSelector(getPageFriends);
  const isHaveMoreData = useAppSelector(getIsHaveMoreFriends);
  const limit = DEFAULT_LIMIT;

  useEffect(() => {
    dispatch(clearDetailUserProfile()); //! без очистки отрабатывает загрузка тренировок предыдущего тренера вперед получения данных о новом пользователе
    dispatch(setPrevLocation(AppRoute.Friends)); //! вроде для обновления главной страницы... но нужно проверить... там нужны только детальная тренировка и детально пользователь

    if (page === 0) {
      dispatch(fetchFriends({ limit }));
    }
  }, [dispatch, page, limit]);

  const handleShowMoreClick = () => {
    dispatch(fetchFriends({ page: page + 1, limit }));
  };

  if (isFetchFriendsExecuting && (page === 0)) {
    return (<Spinner />);
  }

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
      {
        isFetchFriendsExecuting && <Spinner />
      }
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
