import { Link } from 'react-router-dom';

import SliderSection from '../slider-section/slider-section';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_OFFERS } from '../../mock';

const SLIDE_COUNT = 3;

function SpecialForYouSection(): JSX.Element {
  //! перепроверить разметку, шрифты, рус и eng
  //! проверить консоль браузера на ошибки

  const offers = MOCK_OFFERS;
  const childrens = offers.map(
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
      slidesCount={SLIDE_COUNT}
      childrens={childrens}
    />
  );
}

export default SpecialForYouSection;
