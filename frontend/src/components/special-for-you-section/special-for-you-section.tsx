import { Link } from 'react-router-dom';

import SliderSection from '../slider-section/slider-section';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_OFFERS } from '../../mock';

const SLIDE_COUNT = 3;

function SpecialForYouSection(): JSX.Element {
  //! перепроверить разметку, шрифты, рус и eng
  //! проверить консоль браузера на ошибки

  const className = 'special-for-you';
  const childrens = MOCK_OFFERS.map(
    ({ id, picturePath, specialization }) => (
      <li className={`${className}__item`} key={id}>
        <div className="thumbnail-preview">
          <div className="thumbnail-preview__image">
            <picture>
              <img src={picturePath} width="452" height="191" alt="" />
            </picture>
          </div>
          <div className="thumbnail-preview__inner">
            <h3 className="thumbnail-preview__title">{specialization}</h3>
            <div className="thumbnail-preview__button-wrapper">
              <Link className="btn btn--small thumbnail-preview__button" to={getTrainingRoute(id)}>Подробнее</Link>
            </div>
          </div>
        </div>
      </li>
    )
  );

  return (
    <SliderSection
      title='Популярные тренировки'
      sectionClassName={className}
      slidesCount={SLIDE_COUNT}
      childrens={childrens}
    />
  );
}

export default SpecialForYouSection;
