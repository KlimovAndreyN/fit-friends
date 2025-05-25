import { JSX } from 'react';
import classNames from 'classnames';

import { Option } from '../../types/types';

type CustomToggleRadioProps = {
  name: string;
  options: Option[];
  value?: Option['value'];
  readOnly?: boolean;
  divExtraClassNamePrefix?: string;
  isSmall?: boolean;
}

function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  //! если будет участвовать в управляемой форме, то нужно будет доделать

  const { divExtraClassNamePrefix, name, options, value, readOnly, isSmall } = props;
  const divExtraClassName = (divExtraClassNamePrefix) ? `${divExtraClassNamePrefix}__radio` : undefined;
  const className = classNames('custom-toggle-radio', { 'custom-toggle-radio--big': !isSmall }, divExtraClassName);

  return (
    <div className={className}>
      {
        options.map(
          ({ value: currentValue, title }) => {
            const checked = currentValue === value;

            return (
              <div className="custom-toggle-radio__block" key={currentValue}>
                <label>
                  <input type="radio" name={name} value={currentValue} defaultChecked={checked} readOnly={readOnly} />
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
