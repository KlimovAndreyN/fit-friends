import { Link } from 'react-router-dom';

import { ITrainingRdo } from '@backend/shared/core';

import SliderSection from '../slider-section/slider-section';

import { getTrainingRoute } from '../../utils/common';

const SLIDES_COUNT = 3;
const FOR_SPOTRSMAN_COUNT = 9;

type SpecialForYouSectionProps = {
  trainings: ITrainingRdo[];
}

function SpecialForYouSection({ trainings }: SpecialForYouSectionProps): JSX.Element {
  //! перепроверить разметку, шрифты, рус и eng
  //! что делать когда мало карточек? что по ТЗ?
  //! проверить консоль браузера на ошибки

  const childrens = trainings.slice(0, FOR_SPOTRSMAN_COUNT).map(
    ({ id, backgroundPath, specialization }) => (
      <div className="thumbnail-preview" key={id}>
        <div className="thumbnail-preview__image">
          <picture>
            <img src={backgroundPath} width="452" height="191" alt="" />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{specialization}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link className="btn btn--small thumbnail-preview__button" to={getTrainingRoute(id)}>Подробнее</Link>
          </div>
        </div>
      </div>
    )
  );

  return (
    <SliderSection
      title='Специально подобрано для вас'
      sectionClassName='special-for-you'
      slidesCount={SLIDES_COUNT}
      childrens={childrens}
    />
  );
}

export default SpecialForYouSection;
