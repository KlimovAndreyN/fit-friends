import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import PersonalAccountLeftPanel from '../../components/personal-account-left-panel/personal-account-left-panel';

import { isSportsmanRole, IUpdateUserProfileDto } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsFetchUserProfileExecuting, getUserProfile } from '../../store/user-profile-process/selectors';
import { fetchUserProfile, updateUserProfile } from '../../store/actions/user-profile-action';
import { PageTitle } from '../../const';

function Profile(): JSX.Element {
  //! доделать скрытые блоки Друзья и Покупки, пока отключены заглушкой
  //! обработать отображении информации о тренере (2 или 3 этап)

  const dispatch = useAppDispatch();
  const isFetchUserProfileExecuting = useAppSelector(getIsFetchUserProfileExecuting);
  const userRole = useAppSelector(getUserRole);
  const UserProfile = useAppSelector(getUserProfile);

  const handleLeftPanelSubmit = (updatedUserProfile: IUpdateUserProfileDto) => {
    dispatch(updateUserProfile(updatedUserProfile));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  //! UserProfile и userRole можно отдельно обработать если пусто то выдать сообщение об ошибке - компонет Error с текстом и ссылкой на главную
  if (isFetchUserProfileExecuting || !UserProfile || !userRole) {
    //! нужен свой спиннер
    return <MainSpinner />;
  }

  const { questionnaire: { caloriesWaste } } = UserProfile;
  const isSpotsman = isSportsmanRole(userRole);

  return (
    <Fragment>
      <Header title={PageTitle.Profile} />
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
                    ?
                    <div className="personal-account-user">
                      <div className="personal-account-user__schedule">
                        <form action="#" method="get">
                          <div className="personal-account-user__form">
                            <div className="personal-account-user__input">
                              <label>
                                <span className="personal-account-user__label">План на день, ккал</span>
                                {/*
                                //! или выключить или что по ТЗ можно их менять?, но тип поменять на number, как быть со вторым полем...
                                //! когда будет тренер, то выделеить на разные под компоненты
                                */}
                                <input type="text" name="schedule-for-the-day" defaultValue={caloriesWaste} disabled />
                              </label>
                            </div>
                            <div className="personal-account-user__input">
                              <label>
                                <span className="personal-account-user__label">План на неделю, ккал</span>
                                <input type="text" name="schedule-for-the-week" defaultValue={(caloriesWaste || 0) * 7} disabled />
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="personal-account-user__additional-info">
                        <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                            <svg width="30" height="26" aria-hidden="true">
                              <use xlinkHref="#icon-friends"></use>
                            </svg>
                          </div>
                          <span className="thumbnail-link__text">Мои друзья</span>
                        </a>
                        <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                            <svg width="30" height="26" aria-hidden="true">
                              <use xlinkHref="#icon-shopping-cart"></use>
                            </svg>
                          </div>
                          <span className="thumbnail-link__text">Мои покупки</span>
                        </a>
                      </div>
                    </div>
                    :
                    //! тут нужен тренер, если у него что то дополнительно загружается
                    null
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Profile;
