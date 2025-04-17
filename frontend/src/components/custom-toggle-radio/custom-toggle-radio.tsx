import { Option } from '../../types/types';

type CustomToggleRadioProps = {
  divExtraClassName: string;
  name: string;
  options: Option[];
  value?: Option['value'];
}

function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  const { divExtraClassName, name, options, value } = props;

  return (
    <div className={`custom-toggle-radio custom-toggle-radio--big ${divExtraClassName}__radio`}>
      {
        options.map(
          ({ value: curretnValue, title }) => {
            const checked = curretnValue === value;

            return (
              <div className="custom-toggle-radio__block" key={curretnValue}>
                <label>
                  <input type="radio" name={name} value={curretnValue} defaultChecked={checked} />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">{title}</span>
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
