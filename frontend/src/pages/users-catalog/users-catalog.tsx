import { JSX, Fragment } from 'react';

import { IUserProfileRdo, IUserQuery } from '@backend/shared/core';

import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import UsersCatalogForm from '../../components/users-catalog-form/users-catalog-form';
import ResultList from '../../components/result-list/result-list';
import ThumbnailUser from '../../components/thumbnail-user/thumbnail-user';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchUsersExecuting, getIsHaveMoreUsers, getUsersFilter } from '../../store/user-profile-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getNextPage, setUsersFilter } from '../../store/user-profile-process';
import { AppRoute, MOCK_USERS, PageTitle } from '../../const';

function UsersCatalog(): JSX.Element {
  //! Частично функциональность пересекается с каталогом тернировок - подумать как объеденить
  //    Логика: Фильтр -> Обновление данных -> Список
  //! вызвать в useEffect dispatch clearDetailUserProfile + setPrevLocation

  const dispatch = useAppDispatch();
  const usersFilter = useAppSelector(getUsersFilter);
  const users: IUserProfileRdo[] = MOCK_USERS; //useAppSelector(getUsers);
  //const isUsersFilterActivate = useAppSelector(getIsUsersFilterActivate);
  const isFetchUsersExecuting = useAppSelector(getIsFetchUsersExecuting);
  const isHaveMoreUsers = useAppSelector(getIsHaveMoreUsers);
  //const prevLocation = useAppSelector(getPrevLocation);

  useScrollToTop(); //! а если в useEffect?

  ///////useEffect(() => {

  const title = PageTitle.UsersCatalog;
  const location = AppRoute.UsersCatalog;

  const handleFilterOnChange = (newFilter: IUserQuery) => {
    dispatch(setPrevLocation(location));
    //dispatch(setUsersFilter({ ...currentUsersFilter, ...newFilter })); //! возможно тут лишнее т.к. для тренировок была максимальная цена
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
