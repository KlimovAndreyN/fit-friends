import TrainingCard from '../training-card/training-card';

import { useAppSelector } from '../../hooks';
import { getTrainings } from '../../store/training-process/selectors';

function TrainingsList(): JSX.Element {
  const trainings = useAppSelector(getTrainings);

  return (
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
  );
}

export default TrainingsList;
