import { Link } from 'react-router-dom';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_POPULAR_TRAININGS } from '../../mock';

function PopularTrainingList(): JSX.Element {
  //! specialization в русские названия переделать при отображении
  //! проверить консоль браузера на ошибки
  //! куда веде сслыка отзывы, тоже на тренировку? карточки тренировок похожи с карточками в популярных тренировках

  return (
    <ul className="popular-trainings__list">
      {
        MOCK_POPULAR_TRAININGS.map(
          (training) => {
            const { id, title, description, specialization, calorie, picturePath, price } = training;

            return (
              <li className="popular-trainings__item" key={id}>
                <div className="thumbnail-training">
                  <div className="thumbnail-training__inner">
                    <div className="thumbnail-training__image">
                      <picture>
                        <img src={picturePath} width="330" height="190" alt="" />
                      </picture>
                    </div>
                    <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{price}</span><span>₽</span>
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
                      <Link className="btn btn--small thumbnail-training__button-catalog" to={getTrainingRoute(id)}>Подробнее</Link>
                      <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={getTrainingRoute(id)}>Отзывы</Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          }
        )
      }
    </ul>
  );
}

export default PopularTrainingList;
