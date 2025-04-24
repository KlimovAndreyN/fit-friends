import TrainingCard from '../training-card/training-card';

import { useAppSelector } from '../../hooks';
import { getTrainings } from '../../store/training-process/selectors';

type TrainingsListProps = {
  className: string;
}

function TrainingsList({ className }: TrainingsListProps): JSX.Element {
  const trainings = useAppSelector(getTrainings);

  return (
    <div className={className}>
      <ul className={`${className}__list`}>
        {
          trainings.map(
            (training) => (
              <li className={`${className}__item`} key={training.id}>
                <TrainingCard training={training} />
              </li>
            )
          )
        }
      </ul>
      <div className={`show-more ${className}__show-more`}>
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default TrainingsList;
