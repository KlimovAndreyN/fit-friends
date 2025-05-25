import { JSX } from 'react';

import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import SliderSection from '../slider-section/slider-section';

import { ITrainingRdo } from '@backend/shared/core';

import { AppRoute } from '../../const';

const SLIDES_COUNT = 4;

type PopularTrainingSectionProps = {
  trainings: ITrainingRdo[];
}

function PopularTrainingSection({ trainings }: PopularTrainingSectionProps): JSX.Element {
  //! 'Смотреть все' - фильтры выставлять? райтинг например? что по ТЗ?
  //! что делать когда мало карточек? что по ТЗ?
  //! перепроверить разметку, шрифты, рус и eng
  //! проверить консоль браузера на ошибки

  const childrens = trainings.map(
    (training) => (<ThumbnailTraining key={training.id} training={training} />)
  );

  return (
    <SliderSection
      title='Популярные тренировки'
      sectionClassName='popular-trainings'
      showAllLink={AppRoute.TrainingsCatalog}
      childrens={childrens}
      slidesCount={SLIDES_COUNT}
    />
  );
}

export default PopularTrainingSection;
