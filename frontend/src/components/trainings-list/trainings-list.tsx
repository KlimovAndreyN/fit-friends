import { Fragment } from 'react';

import { ITrainingRdo } from '@backend/shared/core';

import TrainingCard from '../training-card/training-card';
import TrainingsListButtons from '../trainings-list-buttons/trainings-list-buttons';

import { OnClick } from '../../types/types';

type TrainingsListProps = {
  className: string;
  trainings: ITrainingRdo[];
  isHaveMoreTrainings: boolean;
  onNextPageClick: OnClick;
  showedAdditionalDiv?: boolean;
}

function TrainingsList(props: TrainingsListProps): JSX.Element {
  const { className, trainings, isHaveMoreTrainings, onNextPageClick, showedAdditionalDiv } = props;

  const handleShowMoreClick = () => {
    onNextPageClick();
  };

  const trainingsList = (
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
            {/* //! добавил "style={{ textAlign: 'center' }}" т.к. в однов варианте есть дополнительный див в одном нет, можно переделать/доделать вывод*/}
            <h3 className={`${className}__title`} style={{ textAlign: 'center' }}>Тренировки не найдены</h3>
          </Fragment>
      }
    </div>
  );

  return showedAdditionalDiv
    ?
    <div className="inner-page__content">
      {trainingsList}
    </div>
    :
    trainingsList;
}

export default TrainingsList;
