import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Specialization } from '@backend/shared/core';

import Header from '../../components/header/header';
import ReviewsPanel from '../../components/reviews-panel/reviews-panel';
import NotFound from '../not-found/not-found';

import { PageTitle, SpecializationTitle } from '../../const';
import { MOCK_USERS } from '../../mock';

function Training(): JSX.Element {
  //! прокрутка на вверх
  //! specialization по месту определять русское название и в нижний регистр
  //! backgroundPath не нужен, нужно видео, фон видео, гендер, время, рейтинг, информация о тренере (картинка и имя и id)
  //! как отборазить если бесплатно? есть что то в маркапах
  //! нужные еще поля genderь, duration, coach {id, avatar, name}
  //! ссылка на видео, навеное если купил тренировку если не куплено то background ? как по ТЗ
  //! проверить консоль браузера на ошибки

  const { id: trainingId } = useParams();

  //! временно! отладка!
  // eslint-disable-next-line no-console
  console.log('Training - trainingId', trainingId);

  const training = {
    id: 'id-78',
    title: 'full body stretch - 2',
    specialization: SpecializationTitle[Specialization.Stretching],
    calorie: 500,
    description: 'Комплекс упражнений на\u00A0растяжку всего тела для новичков. Плавное погружение в\u00A0стретчинг и\u00A0умеренная нагрузка.',
    backgroundPath: '/img/content/thumbnails/training-09.jpg',
    price: 2000,
    rating: 3
  };
  //

  if (!training) {
    //! еще бы дополнительный текст добавить
    return <NotFound />;
  }

  const { title, specialization, calorie, description, price } = training;
  //! временно
  const gender = 'для_всех';
  const duration = '30_50минут';
  const coach = MOCK_USERS[1];
  const { avatarPath, name } = coach;
  //

  return (
    <Fragment>
      <Header title={PageTitle.TrainingDetail} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsPanel />
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img src={avatarPath} width="64" height="64" alt="Изображение тренера" />
                        </picture>
                      </div>
                      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" defaultValue={title} disabled />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea
                                name="description"
                                defaultValue={description}
                                readOnly /*//! disabled  при просмотре поставил readOnly*/
                              />
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>\
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input type="number" name="rating" defaultValue="4" disabled />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{specialization.toLocaleLowerCase()}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{gender}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{calorie}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{duration}</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label><span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" defaultValue={`${price}\u00A0₽`} disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button className="btn training-info__buy" type="button">Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                    <div className="training-video__thumbnail">
                      <picture>
                        <source type="image/webp" srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x" />
                        <img src="img/content/training-video/video-thumbnail.png" srcSet="img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео" />
                      </picture>
                    </div>
                    <button className="training-video__play-button btn-reset">
                      <svg width="18" height="30" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                    <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Training;
