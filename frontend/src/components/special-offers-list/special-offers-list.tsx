import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_SPECIAL_OFFERS } from '../../mock';

const CHANGE_SLIDER_TIMEOUT = 7000;
const SLIDERS_COUNT = 3;

function SpecialOffersList(): JSX.Element | null {
  //! переделать на Swiper?
  //! может немного разбить

  const specialOffers = MOCK_SPECIAL_OFFERS.slice(0, SLIDERS_COUNT); //! если больше 3-х, то можно показывать разные при повторном входе на главную
  const [activeSliderIndex, setActiveSliderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveSliderIndex = (activeSliderIndex === (MOCK_SPECIAL_OFFERS.length - 1)) ? 0 : activeSliderIndex + 1;

      setActiveSliderIndex(newActiveSliderIndex);
    }, CHANGE_SLIDER_TIMEOUT);

    return () => {
      clearInterval(interval);
    };
  }, [activeSliderIndex]);

  if (specialOffers.length < SLIDERS_COUNT) {
    return null;
  }

  return (
    <ul className="special-offers__list">
      {
        specialOffers.map(
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
                        Array.from({ length: SLIDERS_COUNT }).map(
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
