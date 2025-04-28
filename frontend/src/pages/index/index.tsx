import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import SpecialForYouSection from '../../components/special-for-you-section/special-for-you-section';
import SpecialOffersSection from '../../components/special-offers-section/special-offers-section';
import PopularTrainingSection from '../../components/popular-trainings-section/popular-trainings-section';
import LookForCompanySection from '../../components/look-for-company-section/look-for-company-section';

import { getIsFetchForSportsmanTrainingsExecuting, getForSportsmanTrainings, getSpecialTrainings, getPopularTrainings, getIsFetchSpecialTrainingsExecuting, getIsFetchPopularTrainingsExecuting, getShowDetailTraining } from '../../store/training-process/selectors';
import { getIsFetchLookForCompanyUserProfilesExecuting, getLookForCompanyUserProfiles } from '../../store/user-profile-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchForSportsmanTrainings, fetchPopularTrainings, fetchSpecialTrainings } from '../../store/actions/training-action';
import { fetchLookForCompanyUserProfiles } from '../../store/actions/user-profile-action';
import { clearDetailTraining, setShowDetailTraining } from '../../store/training-process';
import { setIsIndexPageActivate, setPrevLocation } from '../../store/user-process';
import { getIsIndexPageActivate, getPrevLocation } from '../../store/user-process/selectors';
import { AppRoute, PageTitle } from '../../const';

function Index(): JSX.Element {
  //! спец предложения при увеличении масшаба занимает все место и выдавлвает блок заглушку - проерить на маркапах
  //! прокрутка на вверх при переходе с каталога и других страниц

  const dispatch = useAppDispatch();
  const isFetchForSportsmanTrainingsExecuting = useAppSelector(getIsFetchForSportsmanTrainingsExecuting);
  const forSportsmanTrainings = useAppSelector(getForSportsmanTrainings);
  const isFetchFetchSpecialTrainingsExecuting = useAppSelector(getIsFetchSpecialTrainingsExecuting);
  const specialTrainings = useAppSelector(getSpecialTrainings);
  const isFetchPopularTrainingsExecuting = useAppSelector(getIsFetchPopularTrainingsExecuting);
  const popularTrainings = useAppSelector(getPopularTrainings);
  const showDetailTraining = useAppSelector(getShowDetailTraining);
  const isFetchLookForCompanyUserProfilesExecuting = useAppSelector(getIsFetchLookForCompanyUserProfilesExecuting);
  const lookForCompanyUserProfiles = useAppSelector(getLookForCompanyUserProfiles);
  const prevLocation = useAppSelector(getPrevLocation);
  const isIndexPageActivate = useAppSelector(getIsIndexPageActivate);
  console.log('prevLocation', prevLocation);

  useEffect(() => {
    if (!isIndexPageActivate) {
      dispatch(setPrevLocation(AppRoute.Index));
      dispatch(setIsIndexPageActivate(true));
    } else if (prevLocation !== AppRoute.TrainingDetail) {
      dispatch(fetchForSportsmanTrainings());
      dispatch(fetchSpecialTrainings());
      dispatch(fetchPopularTrainings());
      dispatch(fetchLookForCompanyUserProfiles());
    }

    dispatch(clearDetailTraining());
  }, [dispatch, isIndexPageActivate, showDetailTraining, prevLocation]);

  const handleShowDetailTraining = () => {
    dispatch(setShowDetailTraining(true));
  };

  if (isFetchForSportsmanTrainingsExecuting || isFetchFetchSpecialTrainingsExecuting || isFetchPopularTrainingsExecuting || isFetchLookForCompanyUserProfilesExecuting) {
    return <MainSpinner />;
  }

  return (
    <Fragment>
      <Header title={PageTitle.Index} />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYouSection trainings={forSportsmanTrainings} onShowDetailTraining={handleShowDetailTraining} />
        <SpecialOffersSection trainings={specialTrainings} onShowDetailTraining={handleShowDetailTraining} />
        <PopularTrainingSection trainings={popularTrainings} onShowDetailTraining={handleShowDetailTraining} />
        <LookForCompanySection userProfiles={lookForCompanyUserProfiles} />
      </main>
    </Fragment>
  );
}

export default Index;
