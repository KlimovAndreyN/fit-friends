import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

type CustomInputProps = {
  divExtraClassName?: string;
  name: string;
  type: string;
  value?: string;
  label?: string;
  text?: string;
  onChange?: (newValue: string) => void;
  required?: boolean;
  max?: string;
  autoComplete?: string;
  readonly?: boolean;
}

function CustomInput(props: CustomInputProps): JSX.Element {
  const { divExtraClassName, name, type, value, label, text, onChange, required, max, autoComplete, readonly } = props;
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    // приходят новые значения из предка! при переключении режимо редактирования и повторной отрисовки формы после получения ответа
    if (value) {
      setCurrentValue(value);
    }
  }, [value]);

  const isTextarea = type === 'textarea';
  const mainType = (isTextarea) ? type : 'input';
  const mainClassName = `custom-${mainType}`;
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readonly }, divExtraClassName);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { value: inputValue } = event.target;

    setCurrentValue(inputValue);
    onChange?.(inputValue);
  };

  const inputProps = {
    name,
    value: currentValue,
    onChange: handleChange,
    required,
    disabled: readonly
  };

  const labelSpan = (!label) ? null : <span className={`${mainClassName}__label`}>{label}</span>;
  const textSpan = (isTextarea || !text) ? null : <span className={`${mainClassName}__text`}>{text}</span>;

  return (
    <div className={divClassNames}>
      <label>
        {labelSpan}
        {
          (isTextarea)
            ?
            <textarea {...inputProps} placeholder=' ' />
            :
            <span className={`${mainClassName}__wrapper`}>
              <input {...inputProps} type={type} max={max} autoComplete={autoComplete} />
              {textSpan}
            </span>
        }
      </label>
    </div>
  );
}

export default CustomInput;
