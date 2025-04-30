import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole, Role, Specialization } from '@backend/shared/core';

import Header from '../../components/header/header';
import BackButton from '../../components/back-button/back-button';
import Hashtags from '../../components/hashtags/hashtags';
import UserDetailGallary from '../../components/user-detail-gallary/user-detail-gallary';
import UserDetailCoachTrainings from '../../components/user-detail-coach-trainings/user-detail-coach-trainings';

import { PageTitle, SpecializationTitle } from '../../const';

const MOCK_USER = {
  userRole: Role.Coach,
  name: 'Валерия',
  location: 'Адмиралтейская',
  readyForTraining: true,
  specializations: [Specialization.Aerobics, Specialization.Boxing, Specialization.Crossfit],
  about: 'Привет! Меня зовут Иванова Валерия, мне 34 года. Япрофессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и&nbsp;силовыми тренировками.',
  description: 'Провожу как индивидуальные тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!',
  filePath: 'img/content/user-coach-photo1.jpg'
} as const;

function UserDetail(): JSX.Element {
  //! прокрутка?
  //! ограничения для тренера на просмотр тренеров в бэке
  //! кнопка - показать сертификаты
  //! проверить разметку
  //! проверить консоль браузера на ошибки

  const { id: userId = '' } = useParams();
  const { userRole, name, location, readyForTraining, specializations, about, description, filePath } = MOCK_USER;
  const isCoach = isCoachRole(userRole);
  const specializationsTitles = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );
  const className = 'user-card-coach'; //! раскидить по все где повторяется

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
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">{name}</h2>
                        </div>
                        <div className="user-card-coach__label">
                          <a href="popup-user-map.html">
                            <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <span>{location}</span>
                          </a>
                        </div>
                        <div className="user-card-coach__status-container">
                          {
                            isCoachRole(userRole)
                              ?
                              <div className="user-card-coach__status user-card-coach__status--tag">
                                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-cup"></use>
                                </svg>
                                <span>Тренер</span>
                              </div>
                              :
                              null
                          }
                          {/*напутано с разметкой.... 'user-card-coach-2__status user-card-coach-2__status--check' серое,  user-card-coach__status user-card-coach__status--check зелоное*/}
                          <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div>
                          <div className={classNames('user-card-coach-2__status', { 'user-card-coach-2__status--check': readyForTraining })}>
                            <span>Готов тренировать</span>
                          </div>
                        </div>
                        <div className="user-card-coach__text">
                          <p>{about}</p>
                          <p>{description}</p>
                        </div>
                        <button className="btn-flat user-card-coach__sertificate" type="button">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg><span>Посмотреть сертификаты</span>
                        </button>
                        <Hashtags
                          classNamePrefix={`${className}__hashtag`}
                          items={specializationsTitles}
                          isNotNeedSpecialClassName
                        />
                        <button className="btn user-card-coach__btn" type="button">Добавить в друзья</button>
                      </div>
                      <UserDetailGallary classNamePrefix={className} filesPaths={[filePath, filePath]} />
                    </div>
                    {isCoachRole(userRole) && <UserDetailCoachTrainings classNamePrefix={className} />}
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
