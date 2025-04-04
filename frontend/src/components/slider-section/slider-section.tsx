import { Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SliderButton from '../slider-button/slider-button';
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
  const swiperRef = useRef<SwiperRef>(null);
  const navigate = useNavigate();

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

  const showAllSliderButtonOption = {
    title: 'Смотреть все',
    className: `btn-flat ${sectionClassName}__button`,
    onClick: handleshowAllButtonClick,
    xlinkHref: '#arrow-right',
    width: 14,
    height: 10
  };
  const previousSliderButtonOption = {
    className: `btn-icon ${sectionClassName}__control`,
    onClick: handlePreviousButtonClick,
    xlinkHref: '#arrow-left',
    width: 16,
    height: 14
  };
  const nextSliderButtonOption = {
    ...previousSliderButtonOption,
    onClick: handleNextButtonClick,
    xlinkHref: '#arrow-right'
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
                    (showAllLink) ? <SliderButton {...showAllSliderButtonOption} /> : null
                  }
                  <div className={`${sectionClassName}__controls`}>
                    <SliderButton {...previousSliderButtonOption} />
                    <SliderButton {...nextSliderButtonOption} />
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
