import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

type CustomCheckboxProps = {
  name: string;
  spanText: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  isDisabled?: boolean;
  divExtraClassName: string;
  isSwitch?: boolean;
}

function CustomCheckbox(props: CustomCheckboxProps): JSX.Element {
  const { name, spanText, value = false, onChange, isDisabled, divExtraClassName, isSwitch } = props;
  const [currentValue, setCurrentValue] = useState<boolean>(value);

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    if (value) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleLabelClick = (event: FormEvent<HTMLLabelElement>) => {
    event.preventDefault();

    setCurrentValue(!currentValue);
    onChange?.(!currentValue);
  };

  const className = classNames(
    'custom-toggle',
    `custom-toggle--${(isSwitch ? 'switch' : 'checkbox')}`,
    divExtraClassName && `${divExtraClassName}__toggle`
  );

  return (
    <div className={className}>
      <label onClick={handleLabelClick}>
        <input type="checkbox" name={name} checked={currentValue} disabled={isDisabled} />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check" />
          </svg>
        </span>
        <span className="custom-toggle__label">{spanText}</span>
      </label>
    </div>
  );
}

export default CustomCheckbox;
