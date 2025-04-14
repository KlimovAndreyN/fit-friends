import { Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import SpecialForYouSection from '../../components/special-for-you-section/special-for-you-section';
import SpecialOffersSection from '../../components/special-offers-section/special-offers-section';
import PopularTrainingSection from '../../components/popular-trainings-section/popular-trainings-section';
import LookForCompanySection from '../../components/look-for-company-section/look-for-company-section';

import { getIsFetchForSportsmanTrainingsExecuting, getForSportsmanTrainings, getSpecialTrainings, getPopularTrainings, getIsFetchSpecialTrainingsExecuting, getIsFetchPopularTrainingsExecuting } from '../../store/training-process/selectors';
import { getIsFetchLookForCompanyUserProfilesExecuting, getLookForCompanyUserProfiles } from '../../store/user-profile-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchForSportsmanTrainings, fetchPopularTrainings, fetchSpecialTrainings } from '../../store/training-action';
import { fetchLookForCompanyUserProfiles } from '../../store/user-profile-action';
import { PageTitle } from '../../const';

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
  const isFetchLookForCompanyUserProfilesExecuting = useAppSelector(getIsFetchLookForCompanyUserProfilesExecuting);
  const lookForCompanyUserProfiles = useAppSelector(getLookForCompanyUserProfiles);

  useEffect(() => {
    const fetchData = async () => {
      // попытка решить проблему при обновления токенов, т.к. вызовы били асинхронные, а получение токенов происходит при ошибке выполениня запроса,
      // то были сдучаю удаления токенов при втором запросе, т.к. первый уже получил токены, а второй обновлял старые, а их уже нет...
      await dispatch(fetchForSportsmanTrainings());
      await dispatch(fetchSpecialTrainings());
      await dispatch(fetchPopularTrainings());
      await dispatch(fetchLookForCompanyUserProfiles());
    };

    fetchData();
  }, [dispatch]);

  if (isFetchForSportsmanTrainingsExecuting || isFetchFetchSpecialTrainingsExecuting || isFetchPopularTrainingsExecuting || isFetchLookForCompanyUserProfilesExecuting) {
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
