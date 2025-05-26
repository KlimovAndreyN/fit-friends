import { JSX } from 'react';

import Trainings from '../../components/trainings/trainings';

import { AppRoute, PageTitle } from '../../const';

function TrainingsCatalog(): JSX.Element {
  return (
    <Trainings
      title={PageTitle.TrainingsCatalog}
      location={AppRoute.TrainingsCatalog}
      formClassName='gym-catalog-form'
      listClassName='training-catalog'
      ratingPrefixClassName='rating'
      showedFilterSpecializations
      showedSorting
    />
  );
}

export default TrainingsCatalog;
