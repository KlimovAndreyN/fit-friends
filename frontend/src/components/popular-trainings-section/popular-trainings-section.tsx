import TrainingCard from '../training-card/training-card';
import SliderSection from '../slider-section/slider-section';

import { ITrainingRdo } from '@backend/shared/core';

import { AppRoute } from '../../const';

const SLIDES_COUNT = 4;

type PopularTrainingSectionProps = {
  trainings: ITrainingRdo[];
}

function PopularTrainingSection({ trainings }: PopularTrainingSectionProps): JSX.Element {
  //! 'Смотреть все' - фильтры выставлять? райтинг например? что по ТЗ?
  //! перепроверить разметку, шрифты, рус и eng
  //! проверить консоль браузера на ошибки

  const childrens = trainings.map(
    (training) => (
      <TrainingCard
        key={training.id}
        //! временно, потом передать весь training
        trainingId={training.id}
      />
    )
  );

  return (
    <SliderSection
      title='Популярные тренировки'
      showAllLink={AppRoute.TrainingCatalog}
      sectionClassName='popular-trainings'
      slidesCount={SLIDES_COUNT}
      childrens={childrens}
    />
  );
}

export default PopularTrainingSection;
