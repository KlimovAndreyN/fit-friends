import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { isSportsmanRole } from '@backend/shared/core';

import Header from '../../components/header/header';
import NotFound from '../not-found/not-found';
import Spinner from '../../components/spinner/spinner';
import ReviewsPanel from '../../components/reviews-panel/reviews-panel';
import TrainingInfo from '../../components/training-info/training-info';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { getUserRole } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getDetailTraining, getIsFetchDetailTrainingError, getIsFetchDetailTrainingExecuting } from '../../store/training-process/selectors';
import { fetchDetailTraining } from '../../store/actions/training-action';
import { clearDetailUserProfile } from '../../store/user-profile-process';
import { AppRoute, PageTitle } from '../../const';

function TrainingDetail(): JSX.Element | null {
  //! прокрутка на вверх
  //! для добавления коментария нужно добавить дополнительные признаки... купил? прошел? 1 раз или несколько... как по ТЗ? всегда один отзыв?

  const dispatch = useAppDispatch();
  const isFetchDetailTrainingExecuting = useAppSelector(getIsFetchDetailTrainingExecuting);
  const isFetchDetailTrainingError = useAppSelector(getIsFetchDetailTrainingError);
  const training = useAppSelector(getDetailTraining);
  const isSportsman = isSportsmanRole(useAppSelector(getUserRole));
  const { id: trainingId = '' } = useParams();

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    dispatch(fetchDetailTraining(trainingId));
    dispatch(setPrevLocation(AppRoute.TrainingDetail));
    dispatch(clearDetailUserProfile());
  }, [dispatch, trainingId]);

  if (!trainingId) {
    //! может сделать компонент - ErrorMessage?
    //! нет id тренировки
    return <NotFound />;
  }

  if (isFetchDetailTrainingExecuting) {
    return <Spinner />;
  }

  if (isFetchDetailTrainingError) {
    //! может сделать компонент - ErrorMessage?
    //! если тренировка не тренера, то будет ошибка 403 - Forbidden; Training not your!;
    //! еще бы дополнительный текст добавить, а его заполнить из ошибки
    return <NotFound />;
  }

  if (!training) {
    // на первом проходе нет загрузки, нет ошибки, и нет тренировки
    return null;
  }

  return (
    <Fragment>
      <Header title={PageTitle.TrainingDetail} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsPanel trainingId={trainingId} isAddReviewButtonEnabled={isSportsman} />
              <TrainingInfo training={training} isSportsman={isSportsman} />
            </div>
          </div>
        </section>
      </main>
    </Fragment >
  );
}

export default TrainingDetail;
