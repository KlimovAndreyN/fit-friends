import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole, Role, Specialization } from '@backend/shared/core';

import Header from '../../components/header/header';
import BackButton from '../../components/back-button/back-button';

import { PageTitle, SpecializationTitle } from '../../const';
import Hashtags from '../../components/hashtags/hashtags';

const MOCK_USER = {
  userRole: Role.Coach,
  name: 'Валерия',
  location: 'Адмиралтейская',
  readyForTraining: true,
  specializations: [Specialization.Aerobics, Specialization.Boxing, Specialization.Crossfit],
  about: 'Привет! Меня зовут Иванова Валерия, мне 34 года. Япрофессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и&nbsp;силовыми тренировками.',
  description: 'Провожу как индивидуальные тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!'
} as const;

function UserDetail(): JSX.Element {
  //! прокрутка?
  //! ограничения для тренера на просмотр тренеров в бэке
  //! кнопка - показать сертификаты
  //! проверить разметку
  //! проверить консоль браузера на ошибки

  const { id: userId = '' } = useParams();
  const { userRole, name, location, readyForTraining, specializations, about, description } = MOCK_USER;
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
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item">
                            <img src="img/content/user-coach-photo1.jpg" width="334" height="573" alt="photo1" />
                          </li>
                          <li className="user-card-coach__gallary-item">
                            <img src="img/content/user-coach-photo2.jpg" width="334" height="573" alt="photo2" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">Тренировки</h2>
                        <div className="user-card-coach__training-bts">
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="user-card-coach__training-list">
                        <li className="user-card-coach__training-item">
                          <div className="thumbnail-training">
                            <div className="thumbnail-training__inner">
                              <div className="thumbnail-training__image">
                                <picture>
                                  <img src="img/content/user-card-coach/training-1.jpg" width="330" height="190" alt="" />
                                </picture>
                              </div>
                              <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1200</span><span>₽</span>
                              </p>
                              <h3 className="thumbnail-training__title">Power</h3>
                              <div className="thumbnail-training__info">
                                <ul className="thumbnail-training__hashtags-list">
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#силовые</span></div>
                                  </li>
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#600ккал</span></div>
                                  </li>
                                </ul>
                                <div className="thumbnail-training__rate">
                                  <svg width="16" height="16" aria-hidden="true">
                                    <use xlinkHref="#icon-star"></use>
                                  </svg><span className="thumbnail-training__rate-value">4</span>
                                </div>
                              </div>
                              <div className="thumbnail-training__text-wrapper">
                                <p className="thumbnail-training__text">Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.</p>
                              </div>
                              <div className="thumbnail-training__button-wrapper">
                                <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                                <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-card-coach__training-item">
                          <div className="thumbnail-training">
                            <div className="thumbnail-training__inner">
                              <div className="thumbnail-training__image">
                                <picture>
                                  <img src="img/content/user-card-coach/training-2.jpg" width="330" height="190" alt="" />
                                </picture>
                              </div>
                              <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">2200</span><span>₽</span>
                              </p>
                              <h3 className="thumbnail-training__title">Devil&rsquo;s Cindy</h3>
                              <div className="thumbnail-training__info">
                                <ul className="thumbnail-training__hashtags-list">
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                                  </li>
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#950ккал</span></div>
                                  </li>
                                </ul>
                                <div className="thumbnail-training__rate">
                                  <svg width="16" height="16" aria-hidden="true">
                                    <use xlinkHref="#icon-star"></use>
                                  </svg><span className="thumbnail-training__rate-value">5</span>
                                </div>
                              </div>
                              <div className="thumbnail-training__text-wrapper">
                                <p className="thumbnail-training__text">Знаменитый кроссфит комплекс. Синди – универсальная тренировка для развития функциональной силы.</p>
                              </div>
                              <div className="thumbnail-training__button-wrapper">
                                <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                                <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-card-coach__training-item">
                          <div className="thumbnail-training">
                            <div className="thumbnail-training__inner">
                              <div className="thumbnail-training__image">
                                <picture>
                                  <img src="img/content/user-card-coach/training-3.jpg" width="330" height="190" alt="" />
                                </picture>
                              </div>
                              <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1000</span><span>₽</span>
                              </p>
                              <h3 className="thumbnail-training__title">boxing</h3>
                              <div className="thumbnail-training__info">
                                <ul className="thumbnail-training__hashtags-list">
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#бокс</span></div>
                                  </li>
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#800ккал</span></div>
                                  </li>
                                </ul>
                                <div className="thumbnail-training__rate">
                                  <svg width="16" height="16" aria-hidden="true">
                                    <use xlinkHref="#icon-star"></use>
                                  </svg><span className="thumbnail-training__rate-value">5</span>
                                </div>
                              </div>
                              <div className="thumbnail-training__text-wrapper">
                                <p className="thumbnail-training__text">Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.</p>
                              </div>
                              <div className="thumbnail-training__button-wrapper">
                                <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                                <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-card-coach__training-item">
                          <div className="thumbnail-training">
                            <div className="thumbnail-training__inner">
                              <div className="thumbnail-training__image">
                                <picture>
                                  <img src="img/content/user-card-coach/training-4.jpg" width="330" height="190" alt="" />
                                </picture>
                              </div>
                              <p className="thumbnail-training__price">Бесплатно
                              </p>
                              <h3 className="thumbnail-training__title">Crossfit</h3>
                              <div className="thumbnail-training__info">
                                <ul className="thumbnail-training__hashtags-list">
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                                  </li>
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag"><span>#1200ккал</span></div>
                                  </li>
                                </ul>
                                <div className="thumbnail-training__rate">
                                  <svg width="16" height="16" aria-hidden="true">
                                    <use xlinkHref="#icon-star"></use>
                                  </svg><span className="thumbnail-training__rate-value">5</span>
                                </div>
                              </div>
                              <div className="thumbnail-training__text-wrapper">
                                <p className="thumbnail-training__text">Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.</p>
                              </div>
                              <div className="thumbnail-training__button-wrapper">
                                <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                                <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="user-card-coach__training-form">
                        <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
                              <span className="custom-toggle__icon" >
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
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
