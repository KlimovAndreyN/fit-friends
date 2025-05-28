import { JSX, Fragment, useEffect } from 'react';

import { IUserProfileRdo, IUserQuery } from '@backend/shared/core';

import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import UsersCatalogForm from '../../components/users-catalog-form/users-catalog-form';
import ResultList from '../../components/result-list/result-list';
import ThumbnailUser from '../../components/thumbnail-user/thumbnail-user';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPrevLocation } from '../../store/user-process/selectors';
import { getIsFetchUsersExecuting, getIsHaveMoreUsers, getIsUsersFilterActivate, getUsers, getUsersFilter } from '../../store/user-profile-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { clearDetailUserProfile, getNextPage, setIsUsersFilterActivate, setUsersFilter } from '../../store/user-profile-process';
import { fetchUsers } from '../../store/actions/user-profile-action';
import { AppRoute, PageTitle } from '../../const';

function UsersCatalog(): JSX.Element {
  //! Частично функциональность пересекается с каталогом тернировок - подумать как объеденить
  //    Логика: Фильтр -> Обновление данных -> Список

  const dispatch = useAppDispatch();
  const usersFilter = useAppSelector(getUsersFilter);
  const users: IUserProfileRdo[] = useAppSelector(getUsers);
  const isUsersFilterActivate = useAppSelector(getIsUsersFilterActivate);
  const isFetchUsersExecuting = useAppSelector(getIsFetchUsersExecuting);
  const isHaveMoreUsers = useAppSelector(getIsHaveMoreUsers);
  const prevLocation = useAppSelector(getPrevLocation);
  const location = AppRoute.UsersCatalog;
  const title = PageTitle.UsersCatalog;

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    if (!isUsersFilterActivate) {
      dispatch(setUsersFilter({}));
      dispatch(setIsUsersFilterActivate(true));
    } else {
      if (prevLocation && (prevLocation !== location) && (prevLocation !== AppRoute.UserDetail)) {
        dispatch(setPrevLocation(location));
        dispatch(setIsUsersFilterActivate(false)); // происходит сброс фильтров, можно и не сбрасывать
      } else if (!prevLocation || (prevLocation === location)) {
        dispatch(fetchUsers(usersFilter));
      }
    }

    dispatch(clearDetailUserProfile());
  }, [dispatch, location, usersFilter, isUsersFilterActivate, prevLocation]);

  const handleFilterOnChange = (newFilter: IUserQuery) => {
    dispatch(setPrevLocation(location));
    dispatch(setUsersFilter({ ...usersFilter, ...newFilter }));
  };

  const handleNextPageClick = () => {
    dispatch(setPrevLocation(location));
    dispatch(getNextPage());
  };

  return (
    <Fragment>
      <Header title={title} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
              <UsersCatalogForm
                usersFilter={usersFilter}
                onUsersFilterChange={handleFilterOnChange}
              />
              {
                (isFetchUsersExecuting && (usersFilter.page === 1))
                  ?
                  <Spinner />
                  :
                  <ResultList
                    mainClassName='users-catalog'
                    childrens={users.map(
                      (user) => (<ThumbnailUser key={user.id} userProfile={user} isUseCoachClassName />)
                    )}
                    isHaveMoreData={isHaveMoreUsers}
                    onNextPageClick={handleNextPageClick}
                    textOnEmpty='Пользователи не найдены'
                    showedAdditionalDiv
                  />
              }
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default UsersCatalog;
