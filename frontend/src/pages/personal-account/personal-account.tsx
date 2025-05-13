import { JSX, Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import PersonalAccountLeftPanel from '../../components/personal-account-left-panel/personal-account-left-panel';
import PersonalAccountRoleSportsman from '../../components/personal-account-role-sportsman/personal-account-role-sportsman';
import PersonalAccountRoleCoach from '../../components/personal-account-role-coach/personal-account-role-coach';

import { isSportsmanRole, IUpdateUserProfileDto } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getIsFetchAccountExecuting, getAccount } from '../../store/account-process/selectors';
import { fetchAccount, updateAccount } from '../../store/actions/account-action';
import { AppRoute, PageTitle } from '../../const';

function PersonalAccount(): JSX.Element {
  const dispatch = useAppDispatch();
  const isFetchAccountExecuting = useAppSelector(getIsFetchAccountExecuting);
  const userRole = useAppSelector(getUserRole);
  const UserProfile = useAppSelector(getAccount);

  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(setPrevLocation(AppRoute.PersonalAccount));
  }, [dispatch]);

  const handleLeftPanelSubmit = (updatedUserProfile: IUpdateUserProfileDto) => {
    dispatch(updateAccount(updatedUserProfile));
  };

  //! UserProfile можно отдельно обработать если пусто то выдать сообщение об ошибке - компонет Error с текстом и ссылкой на главную
  if (isFetchAccountExecuting || !UserProfile) {
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
                account={UserProfile}
                isSpotsmanRole={isSpotsman}
                onSubmit={handleLeftPanelSubmit}
              />
              <div className="inner-page__content">
                {
                  (isSpotsman)
                    ? <PersonalAccountRoleSportsman caloriesWaste={UserProfile.questionnaire.caloriesWaste} />
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
