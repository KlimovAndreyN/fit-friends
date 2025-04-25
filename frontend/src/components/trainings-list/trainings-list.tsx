import { Fragment } from 'react';

import TrainingCard from '../training-card/training-card';
import TrainingsListButtons from '../trainings-list-buttons/trainings-list-buttons';

import { useAppSelector } from '../../hooks';
import { getIsHaveMoreTrainings, getTrainings } from '../../store/training-process/selectors';

type TrainingsListProps = {
  className: string;
}

function TrainingsList({ className }: TrainingsListProps): JSX.Element {
  const trainings = useAppSelector(getTrainings);
  const isHaveMoreTrainings = useAppSelector(getIsHaveMoreTrainings);

  const handleShowMoreClick = () => {
    //! временно
    // eslint-disable-next-line no-console
    console.log('handleShowMoreClick');
  };

  return (
    <div className={className}>
      {
        (trainings.length)
          ?
          <Fragment>
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
            <TrainingsListButtons
              className={className}
              isHaveMoreTrainings={isHaveMoreTrainings}
              onShowMoreClick={handleShowMoreClick}
            />
          </Fragment>
          :
          <Fragment>
            <br />
            <br />
            <h3 className='my-training-form__title'>Тренировки не найдены</h3>
          </Fragment>
      }
    </div>
  );
}

export default TrainingsList;
