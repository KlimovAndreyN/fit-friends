import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SliderButton from '../slider-button/slider-button';
import classNames from 'classnames';

export type SliderProps = {
  title: string;
  showAllLink?: string;
  isShowAllLight?: boolean;
  className: string;
  childrens: JSX.Element[];
  slidesCount: number;
}

function Slider(props: SliderProps): JSX.Element {
  //! слайдер отключение кнопок в угловых? или прокуртку по кругу? как в ТЗ
  //! есть небольшое расхождение с макетом, из-за ...__item:last-child { margin-right: 0; } при слайдере нужно у последнего вилдимого сделать 0
  //!   вообще убрать ul и li, т.к. все на div
  //! если карточек мало, то они схопываются!!! как по ТЗ в разных сециях?
  //   временно добавил (childrensCount < slidesCount) ? childrensCount : slidesCount... карточки по центру... и кнопки слайдера видны пока...
  //   как быть если количество карточек меньше чем количество слайдов
  // по кругу Swiper.loop boolean

  const { title, showAllLink, isShowAllLight, className, childrens, slidesCount } = props;
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
    className: classNames('btn-flat', { 'btn-flat--light': isShowAllLight }, `${className}__button`),
    onClick: handleshowAllButtonClick,
    xlinkHref: '#arrow-right',
    width: 14,
    height: 10
  };
  const previousSliderButtonOption = {
    className: classNames('btn-icon', { 'btn-icon--outlined': isShowAllLight }, `${className}__control`),
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

  return (
    <div className={`${className}__wrapper`}>
      <div className={`${className}__title-wrapper`}>
        <h2 className={`${className}__title`}>{title}</h2>
        {
          (showAllLink) ? <SliderButton {...showAllSliderButtonOption} /> : null
        }
        <div className={`${className}__controls`}>
          <SliderButton {...previousSliderButtonOption} />
          <SliderButton {...nextSliderButtonOption} />
        </div>
      </div>
      <ul className={`${className}__list`}>
        <Swiper slidesPerView={(childrensCount < slidesCount) ? childrensCount : slidesCount} ref={swiperRef}>
          {
            childrens.map(
              (children) => (
                <SwiperSlide
                  key={children.key}
                >
                  <li
                    className={`${className}__item`}
                    style={{
                      height: '100%', // карточки были разноый высоты, а если поменять li и SwiperSlide, то li нет в разметке
                    }}
                    key={children.key}
                  >
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
