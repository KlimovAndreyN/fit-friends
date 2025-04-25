import Trainings from '../../components/trainings/trainings';

import { PageTitle } from '../../const';

function TrainingsCatalog(): JSX.Element {
  return (
    <Trainings
      headerTitle={PageTitle.TrainingsCatalog}
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
