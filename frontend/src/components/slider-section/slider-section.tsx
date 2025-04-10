import { Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SliderButton from '../slider-button/slider-button';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import classNames from 'classnames';

type SliderSectionProps = {
  title: string;
  showAllLink?: string;
  isShowAllLight?: boolean;
  sectionClassName: string;
  childrens: JSX.Element[];
  slidesCount: number;
}

function SliderSection(props: SliderSectionProps): JSX.Element {
  //! слайдер отключение кнопок в угловых? или прокуртку по кругу? как в ТЗ
  //! если карточек мало, то они схопываются!!! как по ТЗ в разных сециях?
  //   временно добавил (childrensCount < slidesCount) ? childrensCount : slidesCount... карточки по центру... и кнопки слайдера видны пока...
  //   как быть если количество карточек меньше чем количество слайдов
  // по кругу Swiper.loop boolean

  const { title, showAllLink, isShowAllLight, sectionClassName, childrens, slidesCount } = props;
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
    className: classNames('btn-flat', { 'btn-flat--light': isShowAllLight }, `${sectionClassName}__button`),
    onClick: handleshowAllButtonClick,
    xlinkHref: '#arrow-right',
    width: 14,
    height: 10
  };
  const previousSliderButtonOption = {
    className: classNames('btn-icon', { 'btn-icon--outlined': isShowAllLight }, `${sectionClassName}__control`),
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
  const childrensCount = childrens.length;

  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className={`${sectionClassName}__wrapper`}>
          {
            (childrensCount)
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
                <ul className={`${sectionClassName}__list`}>
                  <Swiper slidesPerView={(childrensCount < slidesCount) ? childrensCount : slidesCount} ref={swiperRef}>
                    {
                      childrens.map(
                        (children) => {
                          const itemKey = `item-${children.key || ''}`;
                          const slideKey = `slide-${itemKey}`;

                          return (
                            <li className={`${sectionClassName}__item`} key={itemKey}>
                              <SwiperSlide key={slideKey}>
                                {children}
                              </SwiperSlide>
                            </li>
                          );
                        }
                      )
                    }
                  </Swiper>
                </ul>
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
