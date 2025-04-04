import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_TRAININGS } from '../../mock';
import { REVIEWS_ID } from '../../const';

type TrainingCardProps = {
  prefixClassName: string;
  trainingId: string; // временно, потом просто training
}

function TrainingCard({ prefixClassName, trainingId }: TrainingCardProps): JSX.Element {
  //! specialization в русские названия переделать при отображении
  //! заголовок в нижнем регистре? или или там стили?
  //! куда ведут сслыка отзывы, тоже на тренировку? фокус на отзывы? - пока сдела #reviews, но не прокручивает на вверх... перепроверить!

  const className = `${prefixClassName}__item`;

  //! временно
  const training = MOCK_TRAININGS.find(({ id }) => (id === trainingId));
  if (!training) {
    return <>Ошибка</>;
  }
  //

  const { id, title, description, specialization, calorie, picturePath, price } = training;
  const link = getTrainingRoute(id);

  return (
    <li className={className} key={id} style={{ height: '100%' }}>
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
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={{ pathname: link, hash: REVIEWS_ID }} >Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TrainingCard;
