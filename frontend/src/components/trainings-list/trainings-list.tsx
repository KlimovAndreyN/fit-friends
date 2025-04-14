import { ITrainingRdo } from '@backend/shared/core';

import TrainingCard from '../training-card/training-card';

type TrainingsListProps = {
  trainings: ITrainingRdo[];
}

function TrainingsList({ trainings }: TrainingsListProps): JSX.Element {
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
