import Slider, { SliderProps } from '../slider/slider';

type SliderSectionProps = SliderProps;

function SliderSection(props: SliderSectionProps): JSX.Element {
  return (
    <section className={props.sectionClassName}>
      <div className="container">
        <Slider {...props} />
      </div>
    </section>
  );
}

export default SliderSection;
