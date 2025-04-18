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
  //! базовыцй бы класс CustomBase...
  //! иконки можно выделить

  const { name, spanText, value = false, onChange, isDisabled, divExtraClassName, divClassName, isSwitch } = props;
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

  const mainClassName = 'custom-toggle';
  const className = classNames(
    mainClassName,
    `${mainClassName}--${(isSwitch ? 'switch' : 'checkbox')}`,
    divExtraClassName && `${divExtraClassName}__toggle`
  );
  const mainDivClassName = (!divClassName) ? className : `${divClassName}__checkbox`;
  const spanIconClassName = (!divClassName) ? `${mainClassName}__icon` : `${divClassName}__checkbox-icon`;
  const spanLabelClassName = (!divClassName) ? `${mainClassName}__label` : `${divClassName}__checkbox-label`;

  return (
    <div className={mainDivClassName}>
      <label onClick={handleLabelClick}>
        <input type="checkbox" name={name} checked={currentValue} disabled={isDisabled} readOnly />
        <span className={spanIconClassName}>
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check" />
          </svg>
        </span>
        <span className={spanLabelClassName}>{spanText}</span>
      </label>
    </div>
  );
}

export default CustomCheckbox;
