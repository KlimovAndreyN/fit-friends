import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import SpecialForYouSection from '../../components/special-for-you-section/special-for-you-section';
import SpecialOffersSection from '../../components/special-offers-section/special-offers-section';
import PopularTrainingSection from '../../components/popular-trainings-section/popular-trainings-section';
import LookForCompanySection from '../../components/look-for-company-section/look-for-company-section';

import { getIsFetchForSportsmanTrainingsExecuting, getForSportsmanTrainings, getSpecialTrainings, getPopularTrainings } from '../../store/training-process/selectors';
import { getLookForCompanyUserProfiles } from '../../store/user-profile-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchForSportsmanTrainings, fetchPopularTrainings, fetchSpecialTrainings } from '../../store/training-action';
import { fetchLookForCompanyUserProfiles } from '../../store/user-profile-action';
import { PageTitle } from '../../const';

function Index(): JSX.Element {
  //! прокрутка на вверх при переходе с каталога и других страниц
  const dispatch = useAppDispatch();
  const isFetchForSportsmanTrainingsExecuting = useAppSelector(getIsFetchForSportsmanTrainingsExecuting);
  const forSportsmanTrainings = useAppSelector(getForSportsmanTrainings);
  const specialTrainings = useAppSelector(getSpecialTrainings);
  const popularTrainings = useAppSelector(getPopularTrainings);
  const lookForCompanyUserProfiles = useAppSelector(getLookForCompanyUserProfiles);

  useEffect(() => {
    dispatch(fetchForSportsmanTrainings());
    dispatch(fetchSpecialTrainings());
    dispatch(fetchPopularTrainings());
    dispatch(fetchLookForCompanyUserProfiles());
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
        <SpecialForYouSection trainings={forSportsmanTrainings} />
        <SpecialOffersSection trainings={specialTrainings} />
        <PopularTrainingSection trainings={popularTrainings} />
        <LookForCompanySection userProfiles={lookForCompanyUserProfiles} />
      </main>
    </Fragment>
  );
}

export default Index;
