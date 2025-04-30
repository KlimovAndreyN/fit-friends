import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole, Role, Specialization } from '@backend/shared/core';

import Header from '../../components/header/header';
import BackButton from '../../components/back-button/back-button';
import UserPhoto from '../../components/user-photo/user-photo';
import Hashtags from '../../components/hashtags/hashtags';
import UserDetailGallary from '../../components/user-detail-gallary/user-detail-gallary';
import UserDetailCoachTrainingBlock from '../../components/user-detail-coach-training-block/user-detail-coach-training-block';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrevLocation } from '../../store/user-process';
import { getDetailUserProfile } from '../../store/user-profile-process/selectors';
import { fetchDetailUserProfile } from '../../store/actions/user-profile-action';
import { AppRoute, PageTitle, SpecializationTitle } from '../../const';

const MOCK_USER = {
  userRole: Role.Coach,
  avatarPath: 'img/content/avatars/coaches/photo-1@2x.png',
  name: 'Валерия',
  location: 'Адмиралтейская',
  readyForTraining: true,
  specializations: [Specialization.Aerobics, Specialization.Boxing, Specialization.Crossfit],
  about: 'Привет! Меня зовут Иванова Валерия, мне 34 года. Япрофессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и&nbsp;силовыми тренировками.',
  description: 'Провожу как индивидуальные тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!',
  filePath: 'img/content/user-coach-photo1.jpg',
  personal: true
} as const;

function UserDetail(): JSX.Element {
  //! получение данных и очистка сотояния
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
  const { userRole, avatarPath, name, location, readyForTraining, specializations, about, description, filePath, personal } = MOCK_USER;
  const dispatch = useAppDispatch();
  const detailUserProfile = useAppSelector(getDetailUserProfile);

  //! Отладка
  // eslint-disable-next-line no-console
  console.log(detailUserProfile);

  useEffect(() => {
    dispatch(fetchDetailUserProfile(userId));
    dispatch(setPrevLocation(AppRoute.UserDetail));
  }, [dispatch, userId]);

  const isCoach = isCoachRole(userRole);
  const specializationsTitles = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );
  const className = (isCoach) ? `user-card-coach${(personal) ? '-2' : ''}` : 'user-card';

  //! отладка
  // eslint-disable-next-line no-console
  console.log('userId', userId);

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
                        <UserPhoto className='' size={100} path={avatarPath} />
                        <div className={`${className}__head`}>
                          <h2 className={`${className}__title`}>{name}</h2>
                        </div>
                        <div className={`${className}__label`}>
                          <a href="popup-user-map.html">
                            <svg className={`${className}__icon-location`} width="12" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <span>{location}</span>
                          </a>
                        </div>
                        <div className={`${className}__status-container`}>
                          {
                            isCoachRole(userRole) &&
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
                          isCoachRole(userRole) &&
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
                      <UserDetailGallary classNamePrefix={className} filesPaths={[filePath]} />
                    </div>
                    {isCoachRole(userRole) && <UserDetailCoachTrainingBlock classNamePrefix={className} />}
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
