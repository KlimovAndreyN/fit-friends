type CustomSelectProps = {
  divExtraClassName?: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  max?: string;
  autoComplete?: string;
}

const CustomInput = (props: CustomSelectProps) => {
  const { divExtraClassName, name, type, label, required, max, autoComplete } = props;
  const divClassNames = ['custom-input'];
  if (divExtraClassName) {
    divClassNames.push(divExtraClassName);
  }

  return (
    <div className={divClassNames.join(' ')}>
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
          <input type={type} name={name} required={required} max={max} autoComplete={autoComplete} />
        </span>
      </label>
    </div>
  );
};

export default CustomInput;
