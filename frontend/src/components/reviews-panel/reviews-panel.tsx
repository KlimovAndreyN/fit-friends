import { useEffect } from 'react';

import BackButton from '../back-button/back-button';
import MainSpinner from '../main-spinner/main-spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchReviewsExecuting, getReviews } from '../../store/review-process/selectors';
import { fetchReviews } from '../../store/review-action';
import { REVIEWS_ID } from '../../const';
import { MOCK_REVIEWS } from '../../mock';

type ReviewsPanelProps = {
  trainingId: string;
}

function ReviewsPanel({ trainingId }: ReviewsPanelProps): JSX.Element {
  //! если нет аватарки пользователь но вывести заглушку из профиля, возможно нужен отдельный компонет... есть в тренировке
  //! наверное можно нажать на имя или картику пользовтеля и перейти в профиль пользователя
  //! отзывы прокрутка или отображение последних? что по ТЗ, а как все посмотреть, нужно ли
  //! проверить консоль браузера на ошибки

  const dispatch = useAppDispatch();
  const isFetchReviewsExecuting = useAppSelector(getIsFetchReviewsExecuting);
  const reviews1 = useAppSelector(getReviews);

  //! отладка
  // eslint-disable-next-line no-console
  console.log('isFetchReviewsExecuting', isFetchReviewsExecuting);
  // eslint-disable-next-line no-console
  console.log('reviews1', reviews1);
  //

  useEffect(() => {
    dispatch(fetchReviews(trainingId));
  }, [dispatch, trainingId]);

  if (isFetchReviewsExecuting) {
    //! свой спинер бы
    return <MainSpinner />;
  }

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

export default ReviewsPanel;
