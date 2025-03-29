import { Link } from 'react-router-dom';

import { getTrainingLink } from '../../utils/common';
import { MOCK_OFFERS } from '../../mock';

function SpecialForYouSection(): JSX.Element {
  //! сделать листание, добавленные тренировки вывелись правее
  //! заголовок с кнопками похож на всех трех блоках SpecialForYouSection, PopularTrainingSection и LookForCompanySection

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            {
              MOCK_OFFERS.map(
                ({ id, picturePath, specialization }) => (
                  <li className="special-for-you__item" key={id}>
                    <div className="thumbnail-preview">
                      <div className="thumbnail-preview__image">
                        <picture>
                          <img src={picturePath} width="452" height="191" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-preview__inner">
                        <h3 className="thumbnail-preview__title">{specialization}</h3>
                        <div className="thumbnail-preview__button-wrapper">
                          <Link className="btn btn--small thumbnail-preview__button" to={getTrainingLink(id)}>Подробнее</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYouSection;
