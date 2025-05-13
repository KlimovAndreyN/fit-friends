import { JSX, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SliderButton from '../slider-button/slider-button';
import classNames from 'classnames';

function getIndividualControlClassName(extraClassName: string, { className, ariaLabel }: { className: string; ariaLabel: string }): string {
  return [className, `${extraClassName}--${ariaLabel}`].join(' ');
}

export type SliderProps = {
  title?: string;
  classNamePrefix: string;
  separator?: string;
  mainDivClassName?: string;
  mainDivClassNamePostfix?: string;
  titleDivClassNamePostfix: string;
  titleClassNamePostfix?: string;
  additionalTitleElement?: JSX.Element;
  controlsClassNamePostfix?: string;
  controlClassNamePostfix?: string;
  isIndividualControlClassName?: boolean;
  isLightControl?: boolean;
  previousAriaLabel?: string;
  sliderButtonWidth?: number;
  sliderButtonHeight?: number;
  swiperSlideItemClassName?: string;
  childrens: JSX.Element[];
  slidesCount: number;
  marginRight?: number;
  additionalFooterElement?: JSX.Element;
  textForEmpty?: string;
}

function Slider(props: SliderProps): JSX.Element {
  //! есть небольшое расхождение с макетом, из-за ...__item:last-child { margin-right: 0; }
  //    при слайдере нужно у последнего видимого сделать 0, не у последнего в списке
  //    вообще убрать ul и li, т.к. все на div, но как автотесты?

  const {
    title,
    classNamePrefix,
    separator = '-',
    mainDivClassName = '',
    mainDivClassNamePostfix = '',
    titleDivClassNamePostfix,
    titleClassNamePostfix = '',
    additionalTitleElement,
    controlsClassNamePostfix = 'controls',
    controlClassNamePostfix = 'control',
    isIndividualControlClassName,
    isLightControl,
    previousAriaLabel = 'previous',
    sliderButtonWidth = 16,
    sliderButtonHeight = 14,
    swiperSlideItemClassName = '',
    childrens,
    slidesCount,
    marginRight = 20,
    additionalFooterElement,
    textForEmpty
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

  const extraButtonClassName = classNamePrefix + separator + controlClassNamePostfix;
  const previousSliderButtonOption = {
    className: classNames('btn-icon', { 'btn-icon--outlined': isLightControl }, extraButtonClassName),
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

  if (isIndividualControlClassName) {
    previousSliderButtonOption.className = getIndividualControlClassName(extraButtonClassName, previousSliderButtonOption);
    nextSliderButtonOption.className = getIndividualControlClassName(extraButtonClassName, nextSliderButtonOption);
  }

  const currentMainDivClassNamePostfix = (mainDivClassNamePostfix) ? separator + mainDivClassNamePostfix : '';
  const currentMainDivClassName = (mainDivClassName) ? mainDivClassName : classNamePrefix + currentMainDivClassNamePostfix;
  const titleDivClassName = classNamePrefix + separator + titleDivClassNamePostfix;
  const titleClassName = classNamePrefix + separator + titleClassNamePostfix;
  const currentSwiperSlideItemClassName = (swiperSlideItemClassName) ? swiperSlideItemClassName : `${classNamePrefix}${separator}item`;
  const buttons = (
    <div className={classNamePrefix + separator + controlsClassNamePostfix}>
      <SliderButton {...previousSliderButtonOption} />
      <SliderButton {...nextSliderButtonOption} />
    </div>
  );
  const head = (!title) ? buttons : (
    <div className={titleDivClassName}>
      <h2 className={titleClassName}>{title}</h2>
      {additionalTitleElement}
      {buttons}
    </div>
  );

  return (
    <div className={currentMainDivClassName}>
      {head}
      {!childrensCount && textForEmpty && <div className={titleDivClassName} style={{ justifyContent: 'center' }}><span>{textForEmpty}</span></div>}
      <ul className={`${classNamePrefix}${separator}list`}>
        <Swiper slidesPerView={realySlidesCount} ref={swiperRef} onSlideChange={handleSwiperOnSlideChange}>
          {
            childrens.map(
              (children) => (
                <SwiperSlide key={children.key}>
                  <li
                    className={currentSwiperSlideItemClassName}
                    //style={{ height: '100%'/* карточки были разноый высоты, а если поменять li и SwiperSlide, то li нет в разметке*/ }}
                    style={{ marginRight: `${marginRight}px`, height: '100%'/* //! пробую подобрать отступы, можно определить индекс последнего видимого слайда*/ }}
                  >
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
