import { OnClick } from '../../types/types';

type SliderButtonProps = {
  title?: string;
  className: string;
  ariaLabel?: string;
  onClick: OnClick;
  xlinkHref: string;
  width: number;
  height: number;
}

function SliderButton(props: SliderButtonProps): JSX.Element {
  const { title, className, ariaLabel, onClick, xlinkHref, width, height } = props;

  return (
    <button
      className={className}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {
        (title) ? <span>{title}</span> : null
      }
      <svg width={width} height={height} aria-hidden="true">
        <use xlinkHref={xlinkHref} />
      </svg>
    </button>
  );
}

export default SliderButton;
