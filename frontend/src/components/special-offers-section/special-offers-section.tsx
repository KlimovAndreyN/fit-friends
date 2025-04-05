import { getRandomUniqueItems } from '@backend/shared/helpers';

import SpecialOffersList from '../special-offers-list/special-offers-list';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

import { MOCK_SPECIAL_OFFERS } from '../../mock';

const SPECIAL_OFFERS_MIN_COUNT = 3;

function SpecialOffersSection(): JSX.Element {
  //! проверить консоль браузера на ошибки

  const specialOffers = MOCK_SPECIAL_OFFERS; //! временно

  return (
    <section className="special-offers" style={{ position: 'relative', overflow: 'hidden' /* подправил стили, т.к. появляется вертикальная прокрутка, а у дргих секций эти параметры есть */ }}>
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          {
            (specialOffers.length >= SPECIAL_OFFERS_MIN_COUNT)
              ? <SpecialOffersList offers={getRandomUniqueItems(specialOffers, SPECIAL_OFFERS_MIN_COUNT)} /> // если больше 3-х, то можно показывать разные при повторном входе на главную
              : null
          }
          <ThumbnailSpecGym />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffersSection;
