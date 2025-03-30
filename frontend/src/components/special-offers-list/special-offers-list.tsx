import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_SPECIAL_OFFERS } from '../../mock';

function SpecialOffersList(): JSX.Element {
  //! всегда только 3 штуки, отбирать на кленете...
  //! если меньше?
  //! если больше, то можно показывать разные при повторном входе на главную
  const [activeSliderIndex, setActiveSliderIndex] = useState(0);

  return (
    <ul className="special-offers__list">
      {
        MOCK_SPECIAL_OFFERS.map(
          (offer, index) => {
            const { id, title, description, picturePath, price, oldPrice } = offer;
            const isActive = index === activeSliderIndex;
            const itemClassName = classNames('special-offers__item', { 'is-active': isActive });

            return (
              <li className={itemClassName} key={id}>
                <aside className="promo-slider">
                  <div className="promo-slider__overlay"></div>
                  <div className="promo-slider__image">
                    <img src={picturePath} width="1040" height="469" alt="promo-photo" />
                  </div>
                  <div className="promo-slider__header">
                    <Link to={getTrainingRoute(id)}>
                      <h3 className="promo-slider__title">{title}</h3>
                    </Link>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div>
                  <span className="promo-slider__text">{description}</span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      {
                        MOCK_SPECIAL_OFFERS.map(
                          (_, buttonIndex) => {
                            const key = `dot-button-${buttonIndex}`;
                            const className = (buttonIndex === activeSliderIndex)
                              ? 'promo-slider__slider-dot--active promo-slider__slider-dot'
                              : 'promo-slider__slider-dot';

                            const handleDotButtonClick = () => {
                              setActiveSliderIndex(buttonIndex);
                            };

                            return (
                              <button key={key} className={className} aria-label={`${buttonIndex + 1} слайд`} onClick={handleDotButtonClick} />
                            );
                          }
                        )
                      }
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">{price}&nbsp;₽</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">{oldPrice}&nbsp;₽</p>
                    </div>
                  </div>
                </aside>
              </li>
            );
          }
        )
      }
    </ul>
  );
}

export default SpecialOffersList;
