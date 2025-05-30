import { JSX, Fragment, useEffect } from 'react';

import { IUserProfileQuery } from '@backend/shared/core';

import Header from '../../components/header/header';
import UsersCatalogForm from '../../components/users-catalog-form/users-catalog-form';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPrevLocation } from '../../store/user-process/selectors';
import { getIsUsersProfilesFilterActivate, getUsersProfilesFilter } from '../../store/user-profile-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { clearDetailUserProfile, /*getNextPage,*/ setIsUsersFilterActivate, setUsersProfilesFilter } from '../../store/user-profile-process';
import { fetchUsersProfiles } from '../../store/actions/user-profile-action';
import { AppRoute, PageTitle } from '../../const';
import UsersCatalogList from '../../components/users-catalog-list/users-catalog-list';

function UsersCatalog(): JSX.Element {
  //! Частично функциональность пересекается с каталогом тернировок - подумать как объеденить
  //    Логика: Фильтр -> Обновление данных -> Список

  const dispatch = useAppDispatch();
  const usersProfilesFilter = useAppSelector(getUsersProfilesFilter);
  const isUsersProfilesFilterActivate = useAppSelector(getIsUsersProfilesFilterActivate);
  const prevLocation = useAppSelector(getPrevLocation);
  const location = AppRoute.UsersCatalog;
  const title = PageTitle.UsersCatalog;

  useScrollToTop(); //! а если в useEffect?

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

  /*
    const handleNextPageClick = () => {
      dispatch(setPrevLocation(location));
      dispatch(getNextPage());
    };
  */

  return (
    <Fragment>
      <Header title={title} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
              <UsersCatalogForm
                usersFilter={usersProfilesFilter}
                onUsersFilterChange={handleFilterOnChange}
              />
              <UsersCatalogList />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default UsersCatalog;
