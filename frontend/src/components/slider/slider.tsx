import { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

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
  //! слайдер отключение кнопок в крайних положениях!
  //    если childrensCount===slidesCount, то наверное не показывать или обе выключить, как по ТЗ?
  //! если карточек мало, то они схопываются!!! как по ТЗ в разных сециях?
  //   временно добавил (childrensCount < slidesCount) ? childrensCount : slidesCount... карточки по центру... и кнопки слайдера видны пока...
  //   как быть если количество карточек меньше чем количество слайдов
  //   если мало карточек, то может совсем прятать кнопки
  //! есть небольшое расхождение с макетом, из-за ...__item:last-child { margin-right: 0; } при слайдере нужно у последнего вилдимого сделать 0
  //    вообще убрать ul и li, т.к. все на div

  const { title, isLabel, additionalTitleElement, isShowAllLight, classNamePrefix, divClassName, childrens, slidesCount } = props;
  const swiperRef = useRef<SwiperRef>(null);

  const handlePreviousButtonClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextButtonClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const previousSliderButtonOption = {
    className: classNames('btn-icon', { 'btn-icon--outlined': isShowAllLight }, `${classNamePrefix}__control`),
    onClick: handlePreviousButtonClick,
    xlinkHref: '#arrow-left',
    ariaLabel: 'previous',
    width: 16,
    height: 14
  };
  const nextSliderButtonOption = {
    ...previousSliderButtonOption,
    onClick: handleNextButtonClick,
    xlinkHref: '#arrow-right',
    ariaLabel: 'next',
    width: 16,
    height: 14
  };
  const childrensCount = childrens.length;
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
        <Swiper slidesPerView={(childrensCount < slidesCount) ? childrensCount : slidesCount} ref={swiperRef}>
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
