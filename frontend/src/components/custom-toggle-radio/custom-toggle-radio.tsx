import classNames from 'classnames';

type CustomToggleRadioProps = {
  divExtraClassName: string;
  name: string;
  options: string[];
  startOptionValue?: string;
}

function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  const { divExtraClassName, name, options, startOptionValue } = props;
  const divClassName = classNames('custom-toggle-radio custom-toggle-radio--big', divExtraClassName);

  return (
    <div className={divClassName}>
      {
        options.map(
          (value) => {
            const checked = value === startOptionValue;

            return (
              <div className="custom-toggle-radio__block" key={value}>
                <label>
                  <input type="radio" name={name} value={value} defaultChecked={checked} />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">{value} мин</span>
                </label>
              </div>
            );
          }
        )
      }
    </div>
  );
}

export default CustomToggleRadio;
