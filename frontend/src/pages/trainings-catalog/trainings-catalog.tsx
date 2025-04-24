import Trainings from '../../components/trainings/trainings';

import { PageTitle } from '../../const';

function TrainingsCatalog(): JSX.Element {
  return (
    <Trainings
      headerTitle={PageTitle.TrainingsCatalog}
      title='Каталог тренировок'
      mainClassName='aaaaaa'
    />
  );
}

export default TrainingsCatalog;
