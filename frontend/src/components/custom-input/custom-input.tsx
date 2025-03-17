type CustomSelectProps = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  max?: string;
  autoComplete?: string;
}

const CustomInput = (props: CustomSelectProps) => {
  const { name, type, label, required, max, autoComplete } = props;

  return (
    <div className="custom-input">
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
