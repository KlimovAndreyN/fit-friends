import { JSX } from 'react';
import classNames from 'classnames';

import Slider from '../slider/slider';
import PopupModal from '../popup-modal/popup-modal';

const DEFAULT_SLIDES_COUNT = 1;

type PopupModalSliderProps = {
  title: string;
  hiddenTitle: string;
  sliderMainDivClassNamePostfix: string;
  childrens: JSX.Element[];
  slidesCount?: number;
  textForEmpty?: string;
  onClose: () => void;
}

function PopupModalSlider(props: PopupModalSliderProps): JSX.Element {
  const { title, hiddenTitle, sliderMainDivClassNamePostfix, childrens, slidesCount = DEFAULT_SLIDES_COUNT, textForEmpty, onClose } = props;
  const slider = (
    <Slider
      classNamePrefix='popup__slider'
      mainDivClassName={classNames('popup__content', { [`popup__content--${sliderMainDivClassNamePostfix}`]: sliderMainDivClassNamePostfix })}
      titleDivClassNamePostfix='head'
      titleClassNamePostfix='title'
      controlsClassNamePostfix='buttons'
      controlClassNamePostfix='btn'
      previousAriaLabel='prev'
      isIndividualControlClassName
      swiperSlideItemClassName='popup__slide popup__slide--current'
      childrens={childrens}
      slidesCount={slidesCount}
      marginRight={0}
      textForEmpty={textForEmpty}
    />
  );

  return (
    <PopupModal
      title={title}
      hiddenTitle={hiddenTitle}
      content={slider}
      isIndividualContent
      onClose={onClose}
    />
  );
}

export default PopupModalSlider;
