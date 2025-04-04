import BackButton from '../../components/back-button/back-button';

import { MOCK_REVIEWS } from '../../mock';
import { REVIEWS_ID } from '../../const';

function Reviews(): JSX.Element {
  //! если нет аватарки пользователь но вывести заглушку из профиля, возможно нужен отдельный компонет...
  //! наверное можно нажать на имя или картику пользовтеля и перейти в профиль пользователя
  //! отзывы прокрутка или отображение последних? что поТЗ, а как все посмотреть, нужно ли
  //! проверить консоль браузера на ошибки

  const reviews = MOCK_REVIEWS;

  return (
    <aside className="reviews-side-bar">
      <BackButton className='reviews-side-bar' />
      <h2 className="reviews-side-bar__title" id={REVIEWS_ID}>Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {
          reviews.map(
            (review) => {
              const { userId, userName, userAvatarPath, rating, comment } = review;

              return (
                <li className="reviews-side-bar__item" key={userId}>
                  <div className="review">
                    <div className="review__user-info">
                      <div className="review__user-photo">
                        <picture>
                          <img src={userAvatarPath} width="64" height="64" alt="Изображение пользователя" />
                        </picture>
                      </div><span className="review__user-name">{userName}</span>
                      <div className="review__rating">
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <span>{rating}</span>
                      </div>
                    </div>
                    <p className="review__comment">{comment}</p>
                  </div>
                </li>
              );
            }
          )
        }
      </ul>
      <button className="btn btn--medium reviews-side-bar__button" type="button">Оставить отзыв</button>
    </aside>
  );
}

export default Reviews;
