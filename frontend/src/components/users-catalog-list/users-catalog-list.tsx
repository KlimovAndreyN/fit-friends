import { JSX } from 'react';

import Spinner from '../spinner/spinner';
import ResultList from '../result-list/result-list';
import ThumbnailUser from '../thumbnail-user/thumbnail-user';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchUsersProfilesExecuting, getUsersProfiles, getUsersProfilesFilter } from '../../store/user-profile-process/selectors';
import { getNextPage } from '../../store/user-profile-process';
import { fetchUsersProfiles } from '../../store/actions/user-profile-action';


//type UsersCatalogListProps = {
//}

function UsersCatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const isFetchUsersProfilesExecuting = useAppSelector(getIsFetchUsersProfilesExecuting);
  const usersProfiles = useAppSelector(getUsersProfiles);

  return (
    (isFetchUsersProfilesExecuting)
      ?
      <Spinner />
      :
      <ResultList
        mainClassName='users-catalog'
        childrens={usersProfiles.map(
          (user) => (<ThumbnailUser key={user.id} userProfile={user} isUseCoachClassName />)
        )}
        //isHaveMoreData={isHaveMoreUsersProfiles}
        isHaveMoreData
        //onNextPageClick={handleNextPageClick}
        onNextPageClick={() => {
          // eslint-disable-next-line no-console
          console.log('onNextPageClick');
          dispatch(getNextPage());
        }}
        textOnEmpty='Пользователи не найдены'
        showedAdditionalDiv
      />
  );
}

export default UsersCatalogList;
