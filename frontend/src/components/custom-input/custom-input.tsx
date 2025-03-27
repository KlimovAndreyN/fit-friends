import { ChangeEvent } from 'react';
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
  const isTextarea = type === 'textarea';
  const mainType = (isTextarea) ? type : 'input';
  const mainClassName = `custom-${mainType}`;
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readonly }, divExtraClassName);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={divClassNames}>
      <label>
        {
          (label)
            ? <span className={`${mainClassName}__label`}>{label}</span>
            : null
        }
        {
          (isTextarea)
            ?
            <textarea
              name={name}
              placeholder=' '
              value={value}
              disabled={readonly}
            />
            :
            <span className={`${mainClassName}__wrapper`}>
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                required={required}
                max={max}
                autoComplete={autoComplete}
                disabled={readonly}
              />
              {
                (text)
                  ? <span className={`${mainClassName}__text`}>{text}</span>
                  : null
              }
            </span>
        }
      </label>
    </div>
  );
}

export default CustomInput;
