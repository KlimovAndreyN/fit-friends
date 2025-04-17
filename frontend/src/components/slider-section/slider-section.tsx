import Slider, { SliderProps } from '../slider/slider';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

type SliderSectionProps = SliderProps;

function SliderSection(props: SliderSectionProps): JSX.Element {
  const { className, childrens } = props;
  const childrensCount = childrens.length;

  return (
    <section className={className}>
      <div className="container">
        {
          (!childrensCount)
            ? <ThumbnailSpecGym />
            : <Slider {...props} />
        }
      </div>
    </section>
  );
}

export default SliderSection;
