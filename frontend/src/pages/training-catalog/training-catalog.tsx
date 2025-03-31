import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import TrainingCatalogForm from '../../components/training-catalog-form/training-catalog-form';

import { getTrainingRoute } from '../../utils/common';
import { PageTitle } from '../../const';
import { MOCK_TRAININGS } from '../../mock';

function TrainingCatalog(): JSX.Element {
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! проверить консоль браузера на ошибки
  //! заголовок в нижнем регистре? или или там стили?
  //! куда ведут сслыка отзывы, тоже на тренировку? карточки тренировок похожи с карточками в популярных тренировках training-catalog__item/popular-trainings__item

  return (
    <Fragment>
      <Header title={PageTitle.TrainingCatalog} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <TrainingCatalogForm />
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {
                    MOCK_TRAININGS.map(
                      (training) => {
                        const { id, title, description, specialization, calorie, picturePath, price } = training;
                        const link = getTrainingRoute(id);

                        return (
                          <li className="training-catalog__item" key={id}>
                            <div className="thumbnail-training">
                              <div className="thumbnail-training__inner">
                                <div className="thumbnail-training__image">
                                  <picture>
                                    <img src={picturePath} width="330" height="190" alt="" />
                                  </picture>
                                </div>
                                <p className="thumbnail-training__price">
                                  {
                                    (price)
                                      ? <Fragment><span className="thumbnail-training__price-value">{price}</span><span>₽</span></Fragment>
                                      : 'Бесплатно'
                                  }
                                </p>
                                <h3 className="thumbnail-training__title">{title}</h3>
                                <div className="thumbnail-training__info">
                                  <ul className="thumbnail-training__hashtags-list">
                                    <li className="thumbnail-training__hashtags-item">
                                      <div className="hashtag thumbnail-training__hashtag"><span>#{specialization.toLocaleLowerCase()}</span></div>
                                    </li>
                                    <li className="thumbnail-training__hashtags-item">
                                      <div className="hashtag thumbnail-training__hashtag"><span>#{calorie}ккал</span></div>
                                    </li>
                                  </ul>
                                  <div className="thumbnail-training__rate">
                                    <svg width="16" height="16" aria-hidden="true">
                                      <use xlinkHref="#icon-star"></use>
                                    </svg>
                                    <span className="thumbnail-training__rate-value">5</span>
                                  </div>
                                </div>
                                <div className="thumbnail-training__text-wrapper">
                                  <p className="thumbnail-training__text">{description}</p>
                                </div>
                                <div className="thumbnail-training__button-wrapper">
                                  <Link className="btn btn--small thumbnail-training__button-catalog" to={link}>Подробнее</Link>
                                  <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={link}>Отзывы</Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    )
                  }
                </ul>
                <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default TrainingCatalog;
