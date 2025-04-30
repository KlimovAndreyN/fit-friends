import { useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SliderButton from '../slider-button/slider-button';
import classNames from 'classnames';

export type SliderProps = {
  title: string;
  classNamePrefix: string;
  separator?: string;
  mainDivClassNamePostfix?: string;
  titleDivClassNamePostfix: string;
  titleClassNamePostfix: string;
  additionalTitleElement?: JSX.Element;
  controlsClassNamePostfix?: string;
  controlClassNamePostfix?: string;
  isLightControl?: boolean;
  previousAriaLabel?: string;
  sliderButtonWidth?: number;
  sliderButtonHeight?: number;
  childrens: JSX.Element[];
  slidesCount: number;
  additionalFooterElement?: JSX.Element;
}

function Slider(props: SliderProps): JSX.Element {
  //! есть небольшое расхождение с макетом, из-за ...__item:last-child { margin-right: 0; }
  //    при слайдере нужно у последнего видимого сделать 0, не у последнего в списке
  //    вообще убрать ul и li, т.к. все на div, но как автотесты?

  const {
    title,
    classNamePrefix,
    separator = '-',
    mainDivClassNamePostfix = '',
    titleDivClassNamePostfix,
    titleClassNamePostfix,
    additionalTitleElement,
    controlsClassNamePostfix = 'controls',
    controlClassNamePostfix = 'control',
    isLightControl,
    previousAriaLabel = 'previous',
    sliderButtonWidth = 16,
    sliderButtonHeight = 14,
    childrens,
    slidesCount,
    additionalFooterElement
  } = props;
  const [slideActiveIndex, setSlideActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const childrensCount = childrens.length;
  const realySlidesCount = (childrensCount < slidesCount) ? childrensCount : slidesCount;

  const handlePreviousButtonClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextButtonClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handleSwiperOnSlideChange = (swiper: SwiperClass) => {
    setSlideActiveIndex(swiper.activeIndex);
  };

  const previousSliderButtonOption = {
    className: classNames('btn-icon', { 'btn-icon--outlined': isLightControl }, classNamePrefix + separator + controlClassNamePostfix),
    onClick: handlePreviousButtonClick,
    disabled: slideActiveIndex === 0,
    xlinkHref: '#arrow-left',
    ariaLabel: previousAriaLabel,
    width: sliderButtonWidth,
    height: sliderButtonHeight
  };
  const nextSliderButtonOption = {
    ...previousSliderButtonOption,
    onClick: handleNextButtonClick,
    disabled: (childrensCount === realySlidesCount) || (slideActiveIndex === childrensCount - realySlidesCount),
    xlinkHref: '#arrow-right',
    ariaLabel: 'next'
  };

  const mainDivClassName = classNamePrefix + ((mainDivClassNamePostfix) ? separator + mainDivClassNamePostfix : '');
  const titleDivClassName = classNamePrefix + separator + titleDivClassNamePostfix;
  const titleClassName = classNamePrefix + separator + titleClassNamePostfix;

  return (
    <div className={mainDivClassName}>
      <div className={titleDivClassName}>
        <h2 className={titleClassName}>{title}</h2>
        {
          additionalTitleElement
        }
        <div className={classNamePrefix + separator + controlsClassNamePostfix}>
          <SliderButton {...previousSliderButtonOption} />
          <SliderButton {...nextSliderButtonOption} />
        </div>
      </div>
      <ul className={`${classNamePrefix}${separator}list`}>
        <Swiper slidesPerView={realySlidesCount} ref={swiperRef} onSlideChange={handleSwiperOnSlideChange}>
          {
            childrens.map(
              (children) => (
                <SwiperSlide key={children.key}>
                  <li className={`${classNamePrefix}${separator}item`} style={{ height: '100%' /* карточки были разноый высоты, а если поменять li и SwiperSlide, то li нет в разметке*/ }}>
                    {children}
                  </li>
                </SwiperSlide>
              )
            )
          }
        </Swiper>
      </ul>
      {additionalFooterElement}
    </div>
  );
}

export default Slider;
