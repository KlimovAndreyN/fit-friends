import SpecialOffersList from '../special-offers-list/special-offers-list';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

function SpecialOffersSection(): JSX.Element {
  return (
    <section className="special-offers" style={{ position: 'relative', overflow: 'hidden' /* подправил стили, т.к. появляется вертикальная прокрутка, а у дргих секций эти параметры есть */ }}>
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <SpecialOffersList />
          <ThumbnailSpecGym />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffersSection;
