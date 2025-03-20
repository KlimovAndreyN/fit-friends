import classNames from 'classnames';

import { Option } from '../../types/option';

type CustomToggleRadioProps = {
  divExtraClassName: string;
  name: string;
  options: Option[];
  startOptionValue?: Option['value'];
}

function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  const { divExtraClassName, name, options, startOptionValue } = props;
  const divClassName = classNames('custom-toggle-radio custom-toggle-radio--big', divExtraClassName);

  return (
    /*
          options.map(
            (option) => (
              <li
                key={option.value}
                className="custom-select__item"
                onClick={() => handleListItemClick(option)}
              >
                {option.title}
              </li>
            )
          )
    */
    <div className={divClassName}>
      <div className="custom-toggle-radio__block">
        <label>
          <input type="radio" name={name} />
          <span className="custom-toggle-radio__icon"></span>
          <span className="custom-toggle-radio__label">10-30 мин</span>
        </label>
      </div>
      <div className="custom-toggle-radio__block">
        <label>
          <input type="radio" name={name} defaultChecked />
          <span className="custom-toggle-radio__icon"></span>
          <span className="custom-toggle-radio__label">30-50 мин</span>
        </label>
      </div>
      <div className="custom-toggle-radio__block">
        <label>
          <input type="radio" name={name} />
          <span className="custom-toggle-radio__icon"></span>
          <span className="custom-toggle-radio__label">50-80 мин</span>
        </label>
      </div>
      <div className="custom-toggle-radio__block">
        <label>
          <input type="radio" name={name} />
          <span className="custom-toggle-radio__icon"></span>
          <span className="custom-toggle-radio__label">80-100 мин</span>
        </label>
      </div>
    </div>
  );
}

export default CustomToggleRadio;
