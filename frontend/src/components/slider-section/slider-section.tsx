import Slider, { SliderProps } from '../slider/slider';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

type SliderSectionProps = Omit<SliderProps, 'classNamePrefix' | 'divClassName'> & { sectionClassName: string };

function SliderSection(props: SliderSectionProps): JSX.Element {
  const { sectionClassName, ...otherPorps } = props;
  const sliderProps: SliderProps = {
    ...otherPorps,
    classNamePrefix: sectionClassName,
    divClassName: `${sectionClassName}__wrapper`
  };

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
