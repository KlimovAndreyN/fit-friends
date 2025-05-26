import { JSX, Fragment } from 'react';

import { ITrainingRdo } from '@backend/shared/core';

import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';

type TrainingsListProps = {
  className: string;
  trainings: ITrainingRdo[];
  isHaveMoreTrainings: boolean;
  onNextPageClick: () => void;
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
                      <ThumbnailTraining training={training} />
                    </li>
                  )
                )
              }
            </ul>
            <ButtonsShowMoreAndToTop
              divClassNamePrefix={className}
              isHaveMoreData={isHaveMoreTrainings}
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
