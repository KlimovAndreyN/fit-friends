import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole } from '@backend/shared/core';

import Header from '../../components/header/header';
import BackButton from '../../components/back-button/back-button';
import UserPhoto from '../../components/user-photo/user-photo';
import Hashtags from '../../components/hashtags/hashtags';
import UserDetailGallary from '../../components/user-detail-gallary/user-detail-gallary';
import UserDetailCoachTrainingBlock from '../../components/user-detail-coach-training-block/user-detail-coach-training-block';
import NotFound from '../not-found/not-found';
import Spinner from '../../components/spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { setPrevLocation } from '../../store/user-process';
import { getDetailUserProfile, getIsFetchDetailUserProfileError, getIsFetchDetailUserProfileExecuting } from '../../store/user-profile-process/selectors';
import { fetchDetailUserProfile } from '../../store/actions/user-profile-action';
import { AppRoute, LocationTitle, PageTitle, SpecializationTitle } from '../../const';

function UserDetail(): JSX.Element {
  //! сделать меньше количество строк
  //    возможно выделить отдельно блок {`${className}__content`}
  //! прокрутка?
  //! ограничения для тренера на просмотр тренеров в бэке
  //! кнопка - показать сертификаты
  //! ссылка показать карту - popup-user-map.html
  //    возможно отдельный компонет Location, где иконка #icon-location
  //! проверить разметку
  //! проверить консоль браузера на ошибки
  // добавил UserPhoto

  const { id: userId = '' } = useParams();
  const dispatch = useAppDispatch();
  const isFetchDetailUserProfileExecuting = useAppSelector(getIsFetchDetailUserProfileExecuting);
  const isFetchDetailUserProfileError = useAppSelector(getIsFetchDetailUserProfileError);
  const detailUserProfile = useAppSelector(getDetailUserProfile);

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    dispatch(fetchDetailUserProfile(userId));
    dispatch(setPrevLocation(AppRoute.UserDetail));
  }, [dispatch, userId]);


  if (!userId || isFetchDetailUserProfileError) {
    //! проверить как будет выглядеть
    //! еще бы дополнительный текст добавить
    return <NotFound />;
  }

  //! если использовать ! то ошибку не отработать
  if (isFetchDetailUserProfileExecuting || (!detailUserProfile)) {
    return <Spinner />;
  }

  const { user: { role, name, avatarFilePath, location, about, backgroundPath }, questionnaire: { readyForTraining, specializations, description, individualTraining } } = detailUserProfile;

  const isCoach = isCoachRole(role);
  const specializationsTitles = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );
  const className = (isCoach) ? `user-card-coach${(individualTraining) ? '-2' : ''}` : 'user-card';

  return (
    <Fragment>
      <Header title={PageTitle.UserDetail} />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <BackButton className='inner-page' />
              <div className="inner-page__content">
                <section className={className}>
                  <h1 className="visually-hidden">{`Карточка пользователя${(isCoach) ? ' роль тренер' : ''}`}</h1>
                  <div className={`${className}__wrapper`}>
                    <div className={`${className}__card`}>
                      <div className={`${className}__content`}>
                        <UserPhoto className='' size={100} path={avatarFilePath} />
                        <div className={`${className}__head`}>
                          <h2 className={`${className}__title`}>{name}</h2>
                        </div>
                        <div className={`${className}__label`}>
                          <a href="popup-user-map.html">
                            <svg className={`${className}__icon-location`} width="12" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <span>{LocationTitle[location]}</span>
                          </a>
                        </div>
                        <div className={`${className}__status-container`}>
                          {
                            isCoach &&
                            <div className={`${className}__status ${className}__status--tag`}>
                              <svg className={`${className}__icon-cup`} width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                              <span>Тренер</span>
                            </div>
                          }
                          {/*напутано с разметкой.... 'user-card-coach-2__status user-card-coach-2__status--check' серое,  user-card-coach__status user-card-coach__status--check зелоное*/}
                          <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div>
                          <div className={classNames('user-card-coach-2__status', { 'user-card-coach-2__status--check': readyForTraining })}>
                            <span>Готов тренировать</span>
                          </div>
                        </div>
                        <div className={`${className}__text`}>
                          <p>{about}</p>
                          <p>{description}</p>
                        </div>
                        {
                          isCoach &&
                          <button className={`btn-flat ${className}__sertificate`} type="button">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-teacher"></use>
                            </svg><span>Посмотреть сертификаты</span>
                          </button>
                        }
                        <Hashtags
                          classNamePrefix={`${className}__hashtag`}
                          items={specializationsTitles}
                          isNotNeedSpecialClassName
                        />
                        <button className={`btn ${className}__btn`} type="button">Добавить в друзья</button>
                      </div>
                      <UserDetailGallary classNamePrefix={className} filesPaths={[backgroundPath]} />
                    </div>
                    {isCoach && <UserDetailCoachTrainingBlock classNamePrefix={className} userId={userId} />}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default UserDetail;
