import { useNavigate } from 'react-router-dom';

import { MOCK_REVIEWS } from '../../mock';

function Reviews(): JSX.Element {
  //! кнопка назад в отдельный компонент?, может там и прокручивать? еще есть на каталоге тренировок
  //! если нет аватарки пользователь но вывести заглушку из профиля, возможно нужен отдельный компонет...
  //! наверное можно нажать на имя или картику пользовтеля и перейти в профиль пользователя
  //! отзывы прокрутка или отображение последних? что поТЗ, а как все посмотреть, нужно ли
  //! проверить консоль браузера на ошибки
  const navigate = useNavigate();

  return (
    <aside className="reviews-side-bar">
      <button
        className="btn-flat btn-flat--underlined reviews-side-bar__back"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg><span>Назад</span>
      </button>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {
          MOCK_REVIEWS.map(
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
