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
  readOnly?: boolean;
}

function CustomInput(props: CustomInputProps): JSX.Element {
  //! выделить отдельно CustomTextArea и CustomBase
  //! возможно и остальные CustomText, InputNumber....
  //! добавить input type="checkbox"  xlinkHref="#arrow-check"

  const { divExtraClassName, name, type, value, label, text, onChange, required, max, autoComplete, readOnly } = props;
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    if (value) {
      setCurrentValue(value);
    }
  }, [value, readOnly]);

  const isTextarea = type === 'textarea';
  const typePrefixClassName = (isTextarea) ? type : 'input';
  const mainClassName = `custom-${typePrefixClassName}`;
  const divClassName = divExtraClassName && `${divExtraClassName}__${typePrefixClassName}`;
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readOnly }, divClassName);

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
    disabled: readOnly
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
