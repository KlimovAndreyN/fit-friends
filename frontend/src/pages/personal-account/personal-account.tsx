import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import PersonalAccountLeftPanel from '../../components/personal-account-left-panel/personal-account-left-panel';

import { UserRole } from '@backend/shared';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsFetchUserInfoExecuting, getUserInfo } from '../../store/user-info-process/selectors';
import { fetchUserInfo } from '../../store/user-info-action';
import { PageTitle } from '../../const';

function PersonalAccount(): JSX.Element {
  const dispatch = useAppDispatch();
  const isFetchUserInfoExecuting = useAppSelector(getIsFetchUserInfoExecuting);
  const userRole = useAppSelector(getUserRole);
  const userInfo = useAppSelector(getUserInfo);

  useEffect(
    () => {
      //! временно, потом const [searchParams, setSearchParams] = useSearchParams();
      dispatch(fetchUserInfo());
    },
    [dispatch]
  );

  //! userInfo и userRole можно отдельно обработать если пусто то выдать сообщение об ошибке
  if (isFetchUserInfoExecuting || !userInfo || !userRole) {
    //! нужен свой спиннер
    return <MainSpinner />;
  }

  const { questionnaire: { caloriesWaste } } = userInfo;
  const isSpotsmanRole = (userRole === UserRole.Sportsman);

  return (
    <Fragment>
      <Header title={PageTitle.PersonalAccount} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <PersonalAccountLeftPanel userInfo={userInfo} isSpotsmanRole={isSpotsmanRole} />
              <div className="inner-page__content">
                {
                  (isSpotsmanRole)
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
                        <div className="thumbnail-spec-gym">
                          <div className="thumbnail-spec-gym__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                              <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                            </picture>
                          </div>
                          {/* //! закоментировано в маркапах
                          <!--<p className="thumbnail-spec-gym__type">Ближайший зал</p>-->
                          <div className="thumbnail-spec-gym__header", align ="center",>
                          */}
                          <div className="thumbnail-spec-gym__header">
                            <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
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

export default PersonalAccount;
