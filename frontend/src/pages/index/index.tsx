import { JSX, Fragment, useEffect } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import SpecialForYouSection from '../../components/special-for-you-section/special-for-you-section';
import SpecialOffersSection from '../../components/special-offers-section/special-offers-section';
import PopularTrainingSection from '../../components/popular-trainings-section/popular-trainings-section';
import LookForCompanySection from '../../components/look-for-company-section/look-for-company-section';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsIndexPageActivate, setPrevLocation } from '../../store/user-process';
import { getIsIndexPageActivate, getPrevLocation } from '../../store/user-process/selectors';
import { clearDetailTraining } from '../../store/training-process';
import {
  getIsFetchForSportsmanTrainingsExecuting, getForSportsmanTrainings, getSpecialTrainings,
  getPopularTrainings, getIsFetchSpecialTrainingsExecuting, getIsFetchPopularTrainingsExecuting
} from '../../store/training-process/selectors';
import { fetchForSportsmanTrainings, fetchPopularTrainings, fetchSpecialTrainings } from '../../store/actions/training-action';
import { clearDetailUserProfile, clearFriends, clearUsersCatalog } from '../../store/user-profile-process';
import { fetchLookForCompanyUserProfiles } from '../../store/actions/user-profile-action';
import { getIsFetchLookForCompanyUserProfilesExecuting, getLookForCompanyUserProfiles } from '../../store/user-profile-process/selectors';
import { AppRoute, PageTitle } from '../../const';

function Index(): JSX.Element {
  //! спец предложения при увеличении масшаба занимает все место и выдавлвает блок заглушку - проверить на маркапах
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
  const prevLocation = useAppSelector(getPrevLocation);
  const isIndexPageActivate = useAppSelector(getIsIndexPageActivate);

  useEffect(() => {
    const fetchData = async () => {
      // попытка решить проблему при обновления токенов, т.к. вызовы были асинхронные, а получение токенов происходит при ошибке выполениня запроса,
      // то были сдучаю удаления токенов при втором запросе, т.к. первый уже получил токены, а второй обновлял старые, а их уже нет...
      await dispatch(fetchForSportsmanTrainings());
      await dispatch(fetchSpecialTrainings());
      await dispatch(fetchPopularTrainings());
      await dispatch(fetchLookForCompanyUserProfiles());
    };

    if (!isIndexPageActivate) {
      dispatch(setPrevLocation(AppRoute.Index));
      dispatch(setIsIndexPageActivate(true));
    } else if (![AppRoute.TrainingDetail, AppRoute.UserDetail].includes(prevLocation)) {
      fetchData();
    }

    dispatch(clearDetailTraining());
    dispatch(clearDetailUserProfile());
    dispatch(clearUsersCatalog()); //! для обновления информации на странице мои друзья
    dispatch(clearFriends()); //! для обновления информации на странице пользователи
  }, [dispatch, isIndexPageActivate, prevLocation]);

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
