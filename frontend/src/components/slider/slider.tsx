import { useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SliderButton from '../slider-button/slider-button';
import classNames from 'classnames';

export type SliderProps = {
  title: string;
  isLabel?: boolean;
  additionalTitleElement?: JSX.Element;
  isShowAllLight?: boolean;
  classNamePrefix: string;
  divClassName: string;
  childrens: JSX.Element[];
  slidesCount: number;
}

function Slider(props: SliderProps): JSX.Element {
  //! есть небольшое расхождение с макетом, из-за ...__item:last-child { margin-right: 0; } при слайдере нужно у последнего вилдимого сделать 0
  //    вообще убрать ul и li, т.к. все на div

  const { title, isLabel, additionalTitleElement, isShowAllLight, classNamePrefix, divClassName, childrens, slidesCount } = props;
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
    className: classNames('btn-icon', { 'btn-icon--outlined': isShowAllLight }, `${classNamePrefix}__control`),
    onClick: handlePreviousButtonClick,
    disabled: slideActiveIndex === 0,
    xlinkHref: '#arrow-left',
    ariaLabel: 'previous',
    width: 16,
    height: 14
  };
  const nextSliderButtonOption = {
    ...previousSliderButtonOption,
    onClick: handleNextButtonClick,
    disabled: (childrensCount === realySlidesCount) || (slideActiveIndex === childrensCount - realySlidesCount),
    xlinkHref: '#arrow-right',
    ariaLabel: 'next',
    width: 16,
    height: 14
  };
  const titlePrefix = (isLabel) ? 'label' : 'title';

  return (
    <div className={divClassName}>
      <div className={`${classNamePrefix}__${titlePrefix}-wrapper`}>
        <h2 className={`${classNamePrefix}__${titlePrefix}`}>{title}</h2>
        {
          additionalTitleElement
        }
        <div className={`${classNamePrefix}__controls`}>
          <SliderButton {...previousSliderButtonOption} />
          <SliderButton {...nextSliderButtonOption} />
        </div>
      </div>
      <ul className={`${classNamePrefix}__list`}>
        <Swiper slidesPerView={realySlidesCount} ref={swiperRef} onSlideChange={handleSwiperOnSlideChange}>
          {
            childrens.map(
              (children) => (
                <SwiperSlide key={children.key}>
                  <li className={`${classNamePrefix}__item`} style={{ height: '100%' /* карточки были разноый высоты, а если поменять li и SwiperSlide, то li нет в разметке*/ }}>
                    {children}
                  </li>
                </SwiperSlide>
              )
            )
          }
        </Swiper>
      </ul>
    </div>
  );
}

export default Slider;
