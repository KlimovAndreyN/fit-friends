import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ITrainingRdo } from '@backend/shared/core';

import { getTrainingRoute } from '../../utils/common';
import { REVIEWS_ANCHOR, SpecializationTitle } from '../../const';

type TrainingCardProps = {
  training: ITrainingRdo;
}

function TrainingCard({ training }: TrainingCardProps): JSX.Element {
  //! specialization в русские названия переделать при отображении
  //! заголовок в нижнем регистре? или или там стили?
  //! а как выглядят со скидкой? как по ТЗ? как окрулять?
  //! как округлять рейтинг? как по ТЗ? пока округлил до целых
  //! куда ведут сслыка отзывы, тоже на тренировку? фокус на отзывы? - пока сдела #reviews, но не прокручивает на вверх... перепроверить!

  const { id, title, description, specialization, caloriesWaste, backgroundPath, price, rating } = training;
  const link = getTrainingRoute(id);
  const specializationText = SpecializationTitle[specialization].toLocaleLowerCase();
  const ratingText = rating.toFixed(0);

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
              <div className="hashtag thumbnail-training__hashtag"><span>#{specializationText}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{caloriesWaste}ккал</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">{ratingText}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link className="btn btn--small thumbnail-training__button-catalog" to={link}>Подробнее</Link>
          <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={{ pathname: link, hash: REVIEWS_ANCHOR }} >Отзывы</Link>
        </div>
      </div>
    </div>
  );
}

export default TrainingCard;
