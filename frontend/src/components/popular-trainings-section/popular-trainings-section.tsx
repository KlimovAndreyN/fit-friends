import TrainingCard from '../training-card/training-card';
import SliderSection from '../slider-section/slider-section';

import { AppRoute } from '../../const';
import { MOCK_TRAININGS } from '../../mock';

const SLIDE_COUNT = 4;

function PopularTrainingSection(): JSX.Element {
  //! 'Смотреть все' - фильтры выставлять? райтинг например? что по ТЗ?
  //! перепроверить разметку, шрифты, рус и eng
  //! проверить консоль браузера на ошибки

  const trainings = MOCK_TRAININGS;
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
      slidesCount={SLIDE_COUNT}
      childrens={childrens}
    />
  );
}

export default PopularTrainingSection;
