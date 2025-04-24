import TrainingCard from '../training-card/training-card';

import { useAppSelector } from '../../hooks';
import { getTrainings } from '../../store/training-process/selectors';

function TrainingsList(): JSX.Element {
  const trainings = useAppSelector(getTrainings);

  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {
          trainings.map(
            (training) => (
              <li className='training-catalog__item' key={training.id}>
                <TrainingCard training={training} />
              </li>
            )
          )
        }
      </ul>
      <div className="show-more training-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default TrainingsList;
