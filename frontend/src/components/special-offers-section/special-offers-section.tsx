import { getRandomUniqueItems } from '@backend/shared/helpers';

import { ITrainingRdo } from '@backend/shared/core';

import SpecialOffersList from '../special-offers-list/special-offers-list';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

const SPECIAL_OFFERS_MIN_COUNT = 3;

type SpecialOffersSectionProps = {
  trainings: ITrainingRdo[];
}

function SpecialOffersSection({ trainings }: SpecialOffersSectionProps): JSX.Element {
  return (
    <section className="special-offers" style={{ position: 'relative', overflow: 'hidden' /* подправил стили, т.к. появляется вертикальная прокрутка, а у дргих секций эти параметры есть */ }}>
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          {
            (trainings.length >= SPECIAL_OFFERS_MIN_COUNT)
              ? <SpecialOffersList offers={getRandomUniqueItems(trainings, SPECIAL_OFFERS_MIN_COUNT)} /> // если больше 3-х, то можно показывать разные при повторном входе на главную
              : null
          }
          <ThumbnailSpecGym />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffersSection;
