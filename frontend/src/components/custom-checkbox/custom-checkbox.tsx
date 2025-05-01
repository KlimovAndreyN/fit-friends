import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

type CustomCheckboxProps = {
  name: string;
  spanText: string | JSX.Element;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  isDisabled?: boolean;
  divClassName?: string;
  divExtraClassName?: string;
  isSwitch?: boolean;
}

function CustomCheckbox(props: CustomCheckboxProps): JSX.Element {
  //! иконки можно выделить отдельно

  const { name, spanText, value = false, onChange, isDisabled, divExtraClassName, divClassName, isSwitch } = props;
  const [currentValue, setCurrentValue] = useState<boolean>(value);

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleLabelClick = (event: FormEvent) => {
    event.preventDefault();

    if (onChange) {
      onChange(!currentValue);
    } else {
      setCurrentValue(!currentValue);
    }
  };

  const mainClassName = 'custom-toggle';
  const className = classNames(
    mainClassName,
    `${mainClassName}--${(isSwitch ? 'switch' : 'checkbox')}`,
    divExtraClassName && `${divExtraClassName}__toggle`
  );
  const divCheckboxClassName = divClassName && `${divClassName}__checkbox`;
  const mainDivClassName = (divCheckboxClassName) ? `${divCheckboxClassName}` : className;
  const spanIconClassName = (divCheckboxClassName) ? `${divCheckboxClassName}-` : `${mainClassName}__`;
  const spanLabelClassName = (divCheckboxClassName) ? `${divCheckboxClassName}-` : `${mainClassName}__`;

  return (
    <div className={mainDivClassName}>
      <label onClick={handleLabelClick}>
        <input type="checkbox" name={name} checked={currentValue} disabled={isDisabled} readOnly />
        <span className={`${spanIconClassName}icon`}>
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check" />
          </svg>
        </span>
        <span className={`${spanLabelClassName}label`} >{spanText}</span>
      </label>
    </div>
  );
}

export default CustomCheckbox;
