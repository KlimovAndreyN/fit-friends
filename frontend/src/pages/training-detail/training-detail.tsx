import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { isSportsmanRole } from '@backend/shared/core';

import Header from '../../components/header/header';
import ReviewsPanel from '../../components/reviews-panel/reviews-panel';
import NotFound from '../not-found/not-found';
import Spinner from '../../components/spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { getUserRole } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { getDetailTraining, getIsFetchDetailTrainingError, getIsFetchDetailTrainingExecuting } from '../../store/training-process/selectors';
import { fetchDetailTraining } from '../../store/actions/training-action';
import { clearDetailUserProfile } from '../../store/user-profile-process';
import { AppRoute, PageTitle } from '../../const';
import TrainingInfo from '../../components/training-info/training-info';

function TrainingDetail(): JSX.Element {
  //! прокрутка на вверх

  const dispatch = useAppDispatch();
  const { id: trainingId = '' } = useParams();
  const isFetchDetailTrainingExecuting = useAppSelector(getIsFetchDetailTrainingExecuting);
  const isFetchDetailTrainingError = useAppSelector(getIsFetchDetailTrainingError);
  const training = useAppSelector(getDetailTraining);
  const isSportsman = isSportsmanRole(useAppSelector(getUserRole));

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    dispatch(fetchDetailTraining(trainingId));
    dispatch(setPrevLocation(AppRoute.TrainingDetail));
    dispatch(clearDetailUserProfile());
  }, [dispatch, trainingId]);

  if (!trainingId || isFetchDetailTrainingError) {
    //! проверить как будет выглядеть
    //! еще бы дополнительный текст добавить
    return <NotFound />;
  }

  //! если использовать ! то ошибку не отработать
  if (isFetchDetailTrainingExecuting || (!training)) {
    return <Spinner />;
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
