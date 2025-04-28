import Trainings from '../../components/trainings/trainings';

import { AppRoute, PageTitle } from '../../const';

function TrainingsCatalog(): JSX.Element {
  return (
    <Trainings
      headerTitle={PageTitle.TrainingsCatalog}
      location={AppRoute.TrainingsCatalog}
      title='Каталог тренировок'
      formClassName='gym-catalog-form'
      listClassName='training-catalog'
      ratingPrefixClassName='rating'
      showedFilterSpecializations
      showedSorting
    />
  );
}

export default TrainingsCatalog;
