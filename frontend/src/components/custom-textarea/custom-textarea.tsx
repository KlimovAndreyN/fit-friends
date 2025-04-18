import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

type CustomTextareaProps = {
  name: string;
  value?: string;
  label?: string;
  divExtraClassName?: string;
  readOnly?: boolean;
}

function CustomTextarea(props: CustomTextareaProps): JSX.Element {
  //! выделить отдельно CustomBase

  const { divExtraClassName, name, value, label, readOnly } = props;
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    if (value) {
      setCurrentValue(value);
    }
  }, [value, readOnly]);

  const mainClassName = 'custom-textarea';
  const divClassName = classNames(
    mainClassName,
    { [`${mainClassName}--readonly`]: readOnly },
    divExtraClassName && `${divExtraClassName}__textarea`
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const { value: inputValue } = event.target;

    setCurrentValue(inputValue);
  };

  const textareaProps = {
    name,
    value: currentValue,
    onChange: handleChange,
    placeholder: ' ',
    disabled: readOnly
  };

  return (
    <div className={divClassName}>
      <label>
        {label && <span className={`${mainClassName}__label`}>{label}</span>}
        <textarea {...textareaProps} />
      </label>
    </div>
  );
}

export default CustomTextarea;
