import classNames from 'classnames';

type CustomSelectProps = {
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

function CustomInput(props: CustomSelectProps): JSX.Element {
  const { divExtraClassName, name, type, label, text, value, required, max, autoComplete, readonly } = props;
  const mainClassName = 'custom-input';
  const divClassNames = classNames(mainClassName, { [`${mainClassName}--readonly`]: readonly }, divExtraClassName);

  return (
    <div className={divClassNames}>
      <label>
        {
          (label)
            ? <span className={`${mainClassName}__label`}>{label}</span>
            : null
        }
        <span className={`${mainClassName}__wrapper`}>
          <input type={type} name={name} value={value} required={required} max={max} autoComplete={autoComplete} disabled={readonly} />
          {
            (text)
              ? <span className={`${mainClassName}__text`}>{text}</span>
              : null
          }
        </span>
      </label>
    </div>
  );
}

export default CustomInput;
