import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import PersonalAccountLeftPanel from '../../components/personal-account-left-panel/personal-account-left-panel';
import PersonalAccountRoleSportsman from '../../components/personal-account-role-sportsman/personal-account-role-sportsman';
import PersonalAccountRoleCoach from '../../components/personal-account-role-coach/personal-account-role-coach';

import { isSportsmanRole, IUpdateUserProfileDto } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getIsFetchUserProfileExecuting, getUserProfile } from '../../store/account-process/selectors';
import { fetchUserProfile, updateUserProfile } from '../../store/actions/account-action';
import { AppRoute, PageTitle } from '../../const';

function PersonalAccount(): JSX.Element {
  //! доделать скрытые блоки Друзья и Покупки, пока отключены заглушкой
  //! обработать отображение и редактирвоание информации о тренере
  //! одинаковое большие кнопки thumbnail-link thumbnail-link--theme-light, а как у тренера?

  const dispatch = useAppDispatch();
  const isFetchUserProfileExecuting = useAppSelector(getIsFetchUserProfileExecuting);
  const userRole = useAppSelector(getUserRole);
  const UserProfile = useAppSelector(getUserProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(setPrevLocation(AppRoute.PersonalAccount));
  }, [dispatch]);

  const handleLeftPanelSubmit = (updatedUserProfile: IUpdateUserProfileDto) => {
    dispatch(updateUserProfile(updatedUserProfile));
  };

  //! UserProfile можно отдельно обработать если пусто то выдать сообщение об ошибке - компонет Error с текстом и ссылкой на главную
  if (isFetchUserProfileExecuting || !UserProfile) {
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
                UserProfile={UserProfile}
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
