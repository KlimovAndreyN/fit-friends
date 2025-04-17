import { OnClick } from '../../types/types';

type SliderButtonProps = {
  firstTitle?: string;
  secondTitle?: string;
  className: string;
  ariaLabel?: string;
  onClick: OnClick;
  xlinkHref: string;
  width: number;
  height: number;
}

function SliderButton(props: SliderButtonProps): JSX.Element {
  const { firstTitle, secondTitle, className, ariaLabel, onClick, xlinkHref, width, height } = props;

  return (
    <button
      className={className}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {
        (firstTitle) ? <span>{firstTitle}</span> : null
      }
      <svg width={width} height={height} aria-hidden="true">
        <use xlinkHref={xlinkHref} />
      </svg>
      {
        (secondTitle) ? <span>{secondTitle}</span> : null
      }
    </button>
  );
}

export default SliderButton;
