import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Specialization } from '@backend/shared/core';

import { getTrainingRoute } from '../../utils/common';
import { REVIEWS_ID, SpecializationTitle } from '../../const';

type TrainingCardProps = {
  trainingId: string; // временно, потом просто training
}

function TrainingCard({ trainingId }: TrainingCardProps): JSX.Element {
  //! specialization в русские названия переделать при отображении
  //! заголовок в нижнем регистре? или или там стили?
  //! куда ведут сслыка отзывы, тоже на тренировку? фокус на отзывы? - пока сдела #reviews, но не прокручивает на вверх... перепроверить!

  //! временно! отладка!
  // eslint-disable-next-line no-console
  console.log('TrainingCard - trainingId', trainingId);

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
  if (!training) {
    return <>Ошибка</>;
  }
  //

  const { id, title, description, specialization, calorie, backgroundPath, price, rating } = training;
  const link = getTrainingRoute(id);

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img src={backgroundPath} width="330" height="190" alt="" />
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
            <span className="thumbnail-training__rate-value">{rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link className="btn btn--small thumbnail-training__button-catalog" to={link}>Подробнее</Link>
          <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={{ pathname: link, hash: REVIEWS_ID }} >Отзывы</Link>
        </div>
      </div>
    </div>
  );
}

export default TrainingCard;
