import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import SliderButton from '../slider-button/slider-button';
import Slider, { SliderProps } from '../slider/slider';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

type SliderSectionProps =
  Omit<SliderProps, 'classNamePrefix' | 'divClassName'>
  & {
    sectionClassName: string;
    showAllLink?: string;
  };

function SliderSection(props: SliderSectionProps): JSX.Element {
  const { sectionClassName, showAllLink, ...otherPorps } = props;
  const { isShowAllLight } = otherPorps;
  const navigate = useNavigate();

  const handleShowAllButtonClick = () => {
    if (showAllLink) {
      navigate(showAllLink);
    }
  };

  const sliderProps: SliderProps = {
    ...otherPorps,
    classNamePrefix: sectionClassName,
    divClassName: `${sectionClassName}__wrapper`
  };
  const showAllSliderButtonOption = {
    firstTitle: 'Смотреть все',
    className: classNames('btn-flat', { 'btn-flat--light': isShowAllLight }, `${sectionClassName}__button`),
    onClick: handleShowAllButtonClick,
    xlinkHref: '#arrow-right',
    width: 14,
    height: 10
  };

  sliderProps.additionalTitleElement = (showAllLink)
    ? <SliderButton {...showAllSliderButtonOption} />
    : undefined;

  return (
    <section className={sectionClassName}>
      <div className="container">
        {
          (!props.childrens.length)
            ? <ThumbnailSpecGym />
            : <Slider {...sliderProps} />
        }
      </div>
    </section>
  );
}

export default SliderSection;
