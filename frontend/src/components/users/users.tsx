import { JSX, useEffect } from 'react';

import { IUserProfileQuery } from '@backend/shared/core';

import Spinner from '../spinner/spinner';
import UsersForm from '../users-form/users-form';
import ResultList from '../result-list/result-list';
import ThumbnailUser from '../thumbnail-user/thumbnail-user';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPrevLocation } from '../../store/user-process/selectors';
import { getIsFetchUsersProfilesExecuting, getIsHaveMoreUsersProfiles, getIsUsersProfilesFilterActivate, getUsersProfiles, getUsersProfilesFilter } from '../../store/user-profile-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { clearDetailUserProfile, getNextPage, setIsUsersFilterActivate, setUsersProfilesFilter } from '../../store/user-profile-process';
import { fetchUsersProfiles } from '../../store/actions/user-profile-action';
import { AppRoute, PageTitle } from '../../const';

function Users(): JSX.Element {
  //! Частично функциональность пересекается с каталогом тернировок - подумать как объеденить
  //    Логика: Фильтр -> Обновление данных -> Список

  const dispatch = useAppDispatch();
  const usersProfilesFilter = useAppSelector(getUsersProfilesFilter);
  const usersProfiles = useAppSelector(getUsersProfiles);
  const isUsersProfilesFilterActivate = useAppSelector(getIsUsersProfilesFilterActivate);
  const isFetchUsersProfilesExecuting = useAppSelector(getIsFetchUsersProfilesExecuting);
  const isHaveMoreUsersProfiles = useAppSelector(getIsHaveMoreUsersProfiles);
  const prevLocation = useAppSelector(getPrevLocation);
  const location = AppRoute.UsersCatalog;
  const title = PageTitle.UsersCatalog;

  useEffect(() => {
    if (!isUsersProfilesFilterActivate) {
      dispatch(setUsersProfilesFilter({}));
      dispatch(setIsUsersFilterActivate(true));
    } else {
      if (prevLocation && (prevLocation !== location) && (prevLocation !== AppRoute.UserDetail)) {
        dispatch(setPrevLocation(location));
        dispatch(setIsUsersFilterActivate(false)); // происходит сброс фильтров, можно и не сбрасывать
      } else if (!prevLocation || (prevLocation === location)) {
        dispatch(fetchUsersProfiles(usersProfilesFilter));
      }
    }

    dispatch(clearDetailUserProfile());
  }, [dispatch, location, usersProfilesFilter, isUsersProfilesFilterActivate, prevLocation]);

  const handleFilterOnChange = (newFilter: IUserProfileQuery) => {
    dispatch(setPrevLocation(location));
    dispatch(setUsersProfilesFilter({ ...usersProfilesFilter, ...newFilter }));
  };

  const handleNextPageClick = () => {
    dispatch(setPrevLocation(location));
    dispatch(getNextPage());
  };

  return (
    <div className="inner-page__wrapper">
      <h1 className="visually-hidden">{title}</h1>
      <UsersForm
        usersFilter={usersProfilesFilter}
        onUsersFilterChange={handleFilterOnChange}
      />
      {
        (isFetchUsersProfilesExecuting && (usersProfilesFilter.page === 1))
          ?
          <Spinner />
          :
          <ResultList
            mainClassName='users-catalog'
            childrens={usersProfiles.map(
              (user) => (<ThumbnailUser key={user.id} userProfile={user} isUseCoachClassName />)
            )}
            isHaveMoreData={isHaveMoreUsersProfiles}
            isButtonsDisabled={isFetchUsersProfilesExecuting}
            onNextPageClick={handleNextPageClick}
            textOnEmpty='Пользователи не найдены'
            showedAdditionalDiv
          />
      }
    </div>
  );
}

export default Users;
