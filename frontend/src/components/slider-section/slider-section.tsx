import { useNavigate } from 'react-router-dom';
import { Fragment, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

type SliderSectionProps = {
  title: string;
  showAllLink?: string;
  sectionClassName: string;
  childrens: JSX.Element[];
  slidesCount: number;
}

function SliderSection(props: SliderSectionProps): JSX.Element {
  //! перенести на этот-единый слайдер LookForCompanySection
  //! слайдер отключение кнопок в угловых? или прокуртку по кругу? как в ТЗ
  const { title, showAllLink, sectionClassName, childrens, slidesCount } = props;
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperRef>(null);

  const handleshowAllButtonClick = () => {
    if (showAllLink) {
      navigate(showAllLink);
    }
  };

  const handlePreviousButtonClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextButtonClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className={`${sectionClassName}__wrapper`}>
          {
            (childrens.length)
              ?
              <Fragment>
                <div className={`${sectionClassName}__title-wrapper`}>
                  <h2 className={`${sectionClassName}__title`}>{title}</h2>
                  {
                    (showAllLink)
                      ?
                      <button
                        className={`btn-flat ${sectionClassName}__button`}
                        type="button"
                        onClick={handleshowAllButtonClick}
                      >
                        <span>Смотреть все</span>
                        <svg width="14" height="10" aria-hidden="true">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </button>
                      :
                      null
                  }

                  <div className={`${sectionClassName}__controls`}>
                    <button
                      className="btn-icon popular-trainings__control"
                      type="button"
                      aria-label="previous"
                      onClick={handlePreviousButtonClick}
                    >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-left"></use>
                      </svg>
                    </button>
                    <button
                      className={`btn-icon ${sectionClassName}__control`}
                      type="button"
                      aria-label="next"
                      onClick={handleNextButtonClick}
                    >
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <Swiper slidesPerView={slidesCount} ref={swiperRef}>
                  <ul className={`${sectionClassName}__list`}>
                    {
                      childrens.map(
                        (children) => (
                          <SwiperSlide key={children.key}>
                            {children}
                          </SwiperSlide>
                        )
                      )
                    }
                  </ul>
                </Swiper>
              </Fragment>
              :
              <ThumbnailSpecGym />

          }
        </div>
      </div>
    </section>
  );
}

export default SliderSection;
