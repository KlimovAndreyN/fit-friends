import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

type CustomInputProps = {
  name: string;
  type: string;
  value?: string;
  label?: string;
  spanText?: string;
  divExtraClassName?: string;
  onChange?: (newValue: string) => void;
  required?: boolean;
  max?: string;
  autoComplete?: string;
  readOnly?: boolean;
}

function CustomInput(props: CustomInputProps): JSX.Element {
  //! выделить отдельно CustomBase
  //! возможно и остальные CustomText, InputNumber....

  const { name, type, value = '', label, spanText, divExtraClassName, onChange, required, max, autoComplete, readOnly } = props;
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    if (value) {
      setCurrentValue(value);
    }
  }, [value, readOnly]);

  const mainClassName = 'custom-input';
  const divClassName = divExtraClassName && `${divExtraClassName}__input`;
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readOnly }, divClassName);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const { value: inputValue } = event.target;

    setCurrentValue(inputValue);
    onChange?.(inputValue);
  };

  const inputProps = {
    name,
    type,
    autoComplete,
    value: currentValue,
    onChange: handleChange,
    required,
    max,
    disabled: readOnly
  };

  return (
    <div className={divClassNames}>
      <label>
        {label && <span className={`${mainClassName}__label`}>{label}</span>}
        {
          <span className={`${mainClassName}__wrapper`}>
            <input {...inputProps} />
            {!spanText && <span className={`${mainClassName}__text`}>{spanText}</span>}
          </span>
        }
      </label>
    </div>
  );
}

export default CustomInput;
