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
  const { name, type, value = '', label, spanText, divExtraClassName, onChange, required, max, autoComplete, readOnly } = props;
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value, readOnly]);

  const isTextarea = type === 'textarea';
  const mainPostfixClassName = (isTextarea) ? type : 'input';
  const mainClassName = `custom-${mainPostfixClassName}`;
  const divClassName = divExtraClassName && `${divExtraClassName}__${mainPostfixClassName}`;
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readOnly }, divClassName);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const { value: inputValue } = event.target;

    if (onChange) {
      onChange(inputValue);
    } else {
      setCurrentValue(inputValue);
    }
  };

  const textareaProps = {
    name,
    value: currentValue,
    onChange: handleChange,
    disabled: readOnly
  };

  const inputProps = {
    type,
    ...textareaProps,
    autoComplete,
    required,
    max
  };

  return (
    <div className={divClassNames}>
      <label>
        {label && <span className={`${mainClassName}__label`}>{label}</span>}
        {
          <span className={`${mainClassName}__wrapper`}>
            {
              (isTextarea) ? <textarea {...textareaProps} placeholder=' ' /> : <input {...inputProps} />
            }
            {!spanText && <span className={`${mainClassName}__text`}>{spanText}</span>}
          </span>
        }
      </label>
    </div>
  );
}

export default CustomInput;
