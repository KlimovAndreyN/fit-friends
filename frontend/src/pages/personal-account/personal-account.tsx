import { JSX, Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import PersonalAccountLeftPanel from '../../components/personal-account-left-panel/personal-account-left-panel';
import PersonalAccountRoleSportsman from '../../components/personal-account-role-sportsman/personal-account-role-sportsman';
import PersonalAccountRoleCoach from '../../components/personal-account-role-coach/personal-account-role-coach';

import { isSportsmanRole, IUpdateAccountInfoDto } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getIsFetchAccountInfoExecuting, getAccountInfo } from '../../store/account-process/selectors';
import { fetchAccountInfo, updateAccountInfo } from '../../store/actions/account-action';
import { clearFriends } from '../../store/user-profile-process';
import { AppRoute, PageTitle } from '../../const';

function PersonalAccount(): JSX.Element {
  const dispatch = useAppDispatch();
  const isFetchAccountExecuting = useAppSelector(getIsFetchAccountInfoExecuting);
  const userRole = useAppSelector(getUserRole);
  const userProfile = useAppSelector(getAccountInfo);

  useEffect(() => {
    dispatch(clearFriends()); //! для обновления информации на странице мои друзья
    dispatch(setPrevLocation(AppRoute.PersonalAccount)); //! для обновления информации на главной странице, но нужно проверить...

    dispatch(fetchAccountInfo());
    dispatch(setPrevLocation(AppRoute.PersonalAccount));
  }, [dispatch]);

  const handleLeftPanelSubmit = (updatedUserProfile: IUpdateAccountInfoDto) => {
    dispatch(updateAccountInfo(updatedUserProfile));
  };

  //! userProfile можно отдельно обработать если пусто то выдать сообщение об ошибке - компонет Error с текстом и ссылкой на главную
  if (isFetchAccountExecuting || !userProfile) {
    //! нужен свой спиннер
    return <MainSpinner />;
  }

  const isSpotsman = isSportsmanRole(userRole);

  return (
    <Fragment>
      <Header title={PageTitle.PersonalAccount} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <PersonalAccountLeftPanel
                account={userProfile}
                role={userRole}
                onSubmit={handleLeftPanelSubmit}
              />
              <div className="inner-page__content">
                {
                  (isSpotsman)
                    ? <PersonalAccountRoleSportsman caloriesWaste={userProfile.questionnaire.caloriesWaste} />
                    : <PersonalAccountRoleCoach />
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default PersonalAccount;
