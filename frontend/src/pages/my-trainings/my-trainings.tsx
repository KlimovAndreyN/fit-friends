import { useEffect } from 'react';
import Trainings from '../../components/trainings/trainings';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCreatedTraining } from '../../store/training-process';
import { getIsCreatedTraining } from '../../store/training-process/selectors';
import { AppRoute, PageTitle } from '../../const';

function MyTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCreatedTraining = useAppSelector(getIsCreatedTraining);

  useEffect(() => {
    dispatch(clearCreatedTraining());

  }, [dispatch, isCreatedTraining]);

  return (
    <Trainings
      headerTitle={PageTitle.MyTrainings}
      location={AppRoute.MyTrainings}
      title='Мои тренировки'
      formClassName='my-training-form'
      listClassName='my-trainings'
      ratingPrefixClassName='raiting'
      startOnZeroRating
      showedFilterDurations
      showedAdditionalDiv
    />
  );
}

export default MyTrainings;
