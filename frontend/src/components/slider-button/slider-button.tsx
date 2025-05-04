type SliderButtonProps = {
  firstTitle?: string;
  secondTitle?: string;
  className: string;
  ariaLabel?: string;
  onClick: () => void;
  xlinkHref: string;
  width: number;
  height: number;
  disabled?: boolean;
}

function SliderButton(props: SliderButtonProps): JSX.Element {
  const { firstTitle, secondTitle, className, ariaLabel, onClick, xlinkHref, width, height, disabled } = props;

  return (
    <button
      className={className}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
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
