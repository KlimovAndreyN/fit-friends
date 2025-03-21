import classNames from 'classnames';

type CustomSelectProps = {
  divExtraClassName?: string;
  name: string;
  type: string;
  label?: string;
  text?: string;
  required?: boolean;
  max?: string;
  autoComplete?: string;
}

function CustomInput(props: CustomSelectProps): JSX.Element {
  const { divExtraClassName, name, type, label, text, required, max, autoComplete } = props;
  const divClassNames = classNames('custom-input', divExtraClassName);

  return (
    <div className={divClassNames}>
      <label>
        {
          (label)
            ? <span className="custom-input__label">{label}</span>
            : null
        }
        <span className="custom-input__wrapper">
          <input type={type} name={name} required={required} max={max} autoComplete={autoComplete} />
          {
            (text)
              ? <span className="custom-input__text">{text}</span>
              : null
          }
        </span>
      </label>
    </div>
  );
}

export default CustomInput;
