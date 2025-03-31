import TrainingCard from '../training-card/training-card';

import { MOCK_TRAININGS } from '../../mock';

function PopularTrainingList(): JSX.Element {
  //! specialization в русские названия переделать при отображении
  //! заголовок в нижнем регистре? или или там стили?
  //! может перенести в секци... тут несколько строк...
  //! проверить консоль браузера на ошибки

  return (
    <ul className="popular-trainings__list">
      {
        MOCK_TRAININGS.map(
          (training) => {
            //! временно, потом передать training и в одну строку
            const { id } = training;

            return <TrainingCard prefixClassName='popular-trainings' trainingId={id} key={id} />;
          }
        )
      }
    </ul>
  );
}

export default PopularTrainingList;
