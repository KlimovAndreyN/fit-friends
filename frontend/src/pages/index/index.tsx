import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import SpecialForYouSection from '../../components/special-for-you-section/special-for-you-section';
import SpecialOffersSection from '../../components/special-offers-section/special-offers-section';
import PopularTrainingSection from '../../components/popular-trainings-section/popular-trainings-section';
import LookForCompanySection from '../../components/look-for-company-section/look-for-company-section';

import { getIsFetchForSportsmanTrainingsExecuting, getForSportsmanTrainings } from '../../store/training-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchForSportsmanTrainings } from '../../store/training-action';
import { PageTitle } from '../../const';

function Index(): JSX.Element {
  //! прокрутка на вверх при переходе с каталога и других страниц
  const dispatch = useAppDispatch();
  const isFetchForSportsmanTrainingsExecuting = useAppSelector(getIsFetchForSportsmanTrainingsExecuting);
  const trainings = useAppSelector(getForSportsmanTrainings);

  useEffect(() => {
    dispatch(fetchForSportsmanTrainings());
  }, [dispatch]);

  //! добавить и остальное получение данных
  if (isFetchForSportsmanTrainingsExecuting) {
    return <MainSpinner />;
  }

  return (
    <Fragment>
      <Header title={PageTitle.Index} />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYouSection trainings={trainings} />
        <SpecialOffersSection />
        <PopularTrainingSection />
        <LookForCompanySection />
      </main>
    </Fragment>
  );
}

export default Index;
