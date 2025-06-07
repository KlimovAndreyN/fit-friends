import { JSX, useEffect, useState } from 'react';

import { IUserProfileQuery } from '@backend/shared/core';

import Spinner from '../spinner/spinner';
import UsersForm from '../users-form/users-form';
import ResultList from '../result-list/result-list';
import ThumbnailUser from '../thumbnail-user/thumbnail-user';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchUsersProfilesExecuting, getIsHaveMoreUsersProfiles, getUsersProfiles, getUsersProfilesFilter } from '../../store/user-profile-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { clearDetailUserProfile } from '../../store/user-profile-process';
import { fetchUsersProfiles } from '../../store/actions/user-profile-action';
import { AppRoute, PageTitle } from '../../const';

const FIRST_PAGE = 1;

function Users(): JSX.Element {
  //! Частично функциональность пересекается с каталогом тернировок - подумать как объеденить
  //    Логика: Фильтр -> Обновление данных -> Список

  const dispatch = useAppDispatch();
  const usersProfilesFilter = useAppSelector(getUsersProfilesFilter);
  const usersProfiles = useAppSelector(getUsersProfiles);
  const isFetchUsersProfilesExecuting = useAppSelector(getIsFetchUsersProfilesExecuting);
  const isHaveMoreUsersProfiles = useAppSelector(getIsHaveMoreUsersProfiles);
  const [isFilterChange, setIsFilterChange] = useState(false);
  const location = AppRoute.UsersCatalog;
  const { page } = usersProfilesFilter;

  const title = PageTitle.UsersCatalog;

  useEffect(() => {
    dispatch(clearDetailUserProfile()); //! без очистки отрабатывает загрузка тренировок предыдущего тренера вперед получения данных о новом пользователе
    dispatch(setPrevLocation(location)); //! вроде для обновления главной страницы... но нужно проверить... там нужны только детальная тренировка и детально пользователь

    if (page === 0) {
      dispatch(fetchUsersProfiles({ ...usersProfilesFilter, page: FIRST_PAGE }));
    }
  }, [dispatch, location, page, usersProfilesFilter, isFilterChange]);

  const handleFilterOnChange = (newFilter: IUserProfileQuery) => {
    dispatch(setPrevLocation(location)); //! вроде для обновления главной страницы... но нужно проверить... там нужны только детальная тренировка и детально пользователь
    setIsFilterChange(true);
    dispatch(fetchUsersProfiles({ ...usersProfilesFilter, ...newFilter, page: FIRST_PAGE }));
  };

  const handleNextPageClick = () => {
    dispatch(setPrevLocation(location)); //! вроде для обновления главной страницы... но нужно проверить... там нужны только детальная тренировка и детально пользователь
    setIsFilterChange(false);
    dispatch(fetchUsersProfiles({ ...usersProfilesFilter, page: (page ?? 0) + 1 }));
  };

  return (
    <div className="inner-page__wrapper">
      <h1 className="visually-hidden">{title}</h1>
      <UsersForm
        usersFilter={usersProfilesFilter}
        onUsersFilterChange={handleFilterOnChange}
      />
      {
        (isFetchUsersProfilesExecuting && ((page === 0) || isFilterChange))
          ?
          <Spinner />
          :
          <ResultList
            mainClassName='users-catalog'
            childrens={usersProfiles.map(
              (user) => (<ThumbnailUser key={user.id} userProfile={user} isUseCoachClassName />)
            )}
            isHaveMoreData={isHaveMoreUsersProfiles}
            isFetchExecuting={isFetchUsersProfilesExecuting}
            onNextPageClick={handleNextPageClick}
            textOnEmpty='Пользователи не найдены'
            showedAdditionalDiv
          />
      }
    </div>
  );
}

export default Users;
