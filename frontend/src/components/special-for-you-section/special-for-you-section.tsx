import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { getTrainingRoute } from '../../utils/common';
import { MOCK_OFFERS } from '../../mock';

const DEFAULT_SLIDE_COUNT = 3;

function SpecialForYouSection(): JSX.Element {
  //! сделать листание, добавленные тренировки вывелись правее
  //! заголовок с кнопками похож на всех трех блоках SpecialForYouSection, PopularTrainingSection и LookForCompanySection
  //! В случае отсутствия контента для любого из блоков, отображается текст-заглушка: «Скоро здесь появится что-то полезное».
  //! слайдер отключение кнопок в угловых? или прокуртку по кругу? как в ТЗ
  //! обернуть в один компонет с популяными тренировками?
  //! проверить консоль браузера на ошибки
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
                ref={previousButtonRef}
                onClick={() => {
                  swiperRef.current?.swiper.slidePrev();
                }}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="next"
                ref={nextButtonRef}
                onClick={() => {
                  swiperRef.current?.swiper.slideNext();
                }}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            <Swiper
              slidesPerView={DEFAULT_SLIDE_COUNT}
              ref={swiperRef}
            >
              {
                MOCK_OFFERS.map(
                  ({ id, picturePath, specialization }) => (
                    <SwiperSlide key={id}>
                      <li className="special-for-you__item">
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
                    </SwiperSlide>
                  )
                )
              }
            </Swiper>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYouSection;
