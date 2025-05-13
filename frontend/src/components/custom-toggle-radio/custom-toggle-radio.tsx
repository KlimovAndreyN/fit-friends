import { JSX } from 'react';
import classNames from 'classnames';

import { Option } from '../../types/types';

type CustomToggleRadioProps = {
  divExtraClassName: string;
  name: string;
  options: Option[];
  value?: Option['value'];
  readOnly?: boolean;
  isSmall?: boolean;
}

function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  //! если бкудет участвовать в управляемой форме, то нужно будет доделать

  const { divExtraClassName, name, options, value, readOnly, isSmall } = props;
  const className = classNames('custom-toggle-radio', { 'custom-toggle-radio--big': !isSmall }, `${divExtraClassName}__radio`);

  return (
    <div className={className}>
      {
        options.map(
          ({ value: curretnValue, title }) => {
            const checked = curretnValue === value;

            return (
              <div className="custom-toggle-radio__block" key={curretnValue}>
                <label>
                  <input type="radio" name={name} value={curretnValue} defaultChecked={checked} readOnly={readOnly} />
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
