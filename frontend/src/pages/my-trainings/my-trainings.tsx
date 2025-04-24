import Trainings from '../../components/trainings/trainings';

import { PageTitle } from '../../const';

function MyTrainings(): JSX.Element {
  return (
    <Trainings
      headerTitle={PageTitle.MyTrainings}
      title='Мои тренировки'
      formClassName='my-training-form'
      showedAdditionalDiv
    />
  );
}

export default MyTrainings;
