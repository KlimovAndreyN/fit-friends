import classNames from 'classnames';

import { Option } from '../../types/option';

type CustomToggleRadioProps = {
  divExtraClassName: string;
  name: string;
  options: Option[];
  value?: Option['value'];
}

function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  const { divExtraClassName, name, options, value } = props;
  const divClassName = classNames('custom-toggle-radio custom-toggle-radio--big', divExtraClassName);

  return (
    <div className={divClassName}>
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
