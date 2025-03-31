import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import TrainingCard from '../training-card/training-card';

import { AppRoute } from '../../const';
import { MOCK_TRAININGS } from '../../mock';

const DEFAULT_SLIDE_COUNT = 4;

function PopularTrainingSection(): JSX.Element {
  //! заголовок с кнопками похож на всех трех блоках SpecialForYouSection, PopularTrainingSection и LookForCompanySection
  //! 'Смотреть все' - фильтры выставлять? райтинг например? что по ТЗ?
  //! В случае отсутствия контента для любого из блоков, отображается текст-заглушка: «Скоро здесь появится что-то полезное».
  //! слайдер отключение кнопок в угловых? или прокуртку по кругу? как в ТЗ
  //! обернуть в один компонет со специальнми предложениями?
  //! проверить консоль браузера на ошибки
  const navigate = useNavigate();
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={() => {
                navigate(AppRoute.TrainingCatalog);
              }}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
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
                className="btn-icon popular-trainings__control"
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
          <Swiper
            slidesPerView={DEFAULT_SLIDE_COUNT}
            ref={swiperRef}
          >
            <ul className="popular-trainings__list">
              {
                MOCK_TRAININGS.map(
                  (training) => {
                    //! временно, потом передать training и в одну строку
                    const { id } = training;

                    return (
                      <SwiperSlide key={id}>
                        <TrainingCard prefixClassName='popular-trainings' trainingId={id} />
                      </SwiperSlide>
                    );
                  }
                )
              }
            </ul>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainingSection;
