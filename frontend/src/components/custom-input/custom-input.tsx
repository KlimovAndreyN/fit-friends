import classNames from 'classnames';

type CustomInputProps = {
  divExtraClassName?: string;
  name: string;
  type: string;
  value?: string;
  label?: string;
  text?: string;
  required?: boolean;
  max?: string;
  autoComplete?: string;
  readonly?: boolean;
}

function CustomInput(props: CustomInputProps): JSX.Element {
  const { divExtraClassName, name, type, label, text, value, required, max, autoComplete, readonly } = props;
  const isTextarea = type === 'textarea';
  const mainType = (isTextarea) ? type : 'input';
  const mainClassName = `custom-${mainType}`;
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readonly }, divExtraClassName);

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
            <textarea name={name} placeholder=" " defaultValue={value} disabled={readonly} />
            :
            <span className={`${mainClassName}__wrapper`}>
              <input type={type} name={name} defaultValue={value} required={required} max={max} autoComplete={autoComplete} disabled={readonly} />
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
