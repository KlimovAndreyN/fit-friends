import { useEffect } from 'react';

import BackButton from '../back-button/back-button';
import UserPhoto from '../user-photo/user-photo';
import Spinner from '../spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchReviewsExecuting, getReviews } from '../../store/review-process/selectors';
import { fetchReviews } from '../../store/actions/review-action';
import { REVIEWS_ANCHOR } from '../../const';

type ReviewsPanelProps = {
  trainingId: string;
  isAddReviewButtonEnabled?: boolean;
}

function ReviewsPanel({ trainingId, isAddReviewButtonEnabled }: ReviewsPanelProps): JSX.Element {
  //! если нет отзывов, то вывести текст "отзывов еще нет...", как по ТЗ
  //! наверное можно нажать на имя или картику пользовтеля и перейти в профиль пользователя
  //! если спортсмен уже оставлял отзыв, то кнопку можно заблокировать
  //! отзывы прокрутка или отображение последних? что по ТЗ, а как все посмотреть, нужно ли
  //! проверить консоль браузера на ошибки
  //! два раза выборка, перенсти на одну страницу

  const dispatch = useAppDispatch();
  const isFetchReviewsExecuting = useAppSelector(getIsFetchReviewsExecuting);
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    dispatch(fetchReviews(trainingId));
  }, [dispatch, trainingId]);

  if (isFetchReviewsExecuting) {
    return <Spinner />;
  }

  return (
    <aside className="reviews-side-bar">
      <BackButton className='reviews-side-bar' underlined />
      <h2 className="reviews-side-bar__title" id={REVIEWS_ANCHOR}>Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {
          reviews.map(
            (review) => {
              const { user: { id: userId, name: userName, avatarFilePath: userAvatarFilePath }, rating, message } = review;

              return (
                <li className="reviews-side-bar__item" key={userId}>
                  <div className="review">
                    <div className="review__user-info">
                      <UserPhoto path={userAvatarFilePath} className='review__user-photo' />
                      <span className="review__user-name">{userName}</span>
                      <div className="review__rating">
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star" />
                        </svg>
                        <span>{rating}</span>
                      </div>
                    </div>
                    <p className="review__comment">{message}</p>
                  </div>
                </li>
              );
            }
          )
        }
      </ul>
      <button className="btn btn--medium reviews-side-bar__button" type="button" disabled={!isAddReviewButtonEnabled}>Оставить отзыв</button>
    </aside>
  );
}

export default ReviewsPanel;
