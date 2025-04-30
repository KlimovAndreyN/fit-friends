import { MouseEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { SPECIALISATIONS } from '../../const';

type SpecializationsCheckboxProps = {
  name: string;
  values: string[];
  divExtraClassName: string;
  readOnly?: boolean;
  fromPersonalAccount?: boolean;
}

function SpecializationsCheckbox({ name, values, divExtraClassName, readOnly, fromPersonalAccount }: SpecializationsCheckboxProps): JSX.Element {
  const classNamePostfix = (fromPersonalAccount) ? 'specialization' : 'specializations';
  const className = classNames('specialization-checkbox', `${divExtraClassName}__${classNamePostfix}`);
  const [currentValues, setCurrentValues] = useState(values);

  useEffect(() => {
    // приходят новые значения из предка! при переключении режима редактирования и повторной отрисовки формы после получения ответа
    setCurrentValues(values);
  }, [values, readOnly]);

  return (
    <div className={className}>
      {
        SPECIALISATIONS.map(
          ({ value, title }) => {
            const checked = currentValues.includes(value);

            const handleDivOnClick = (event: MouseEvent<HTMLDivElement>) => {
              event.preventDefault();

              if (checked) {
                setCurrentValues(currentValues.filter((item) => (item !== value)));
              } else {
                setCurrentValues([...currentValues, value]);
              }
            };

            return (
              <div className="btn-checkbox" key={value} onClick={handleDivOnClick}>
                <label>
                  <input className="visually-hidden" type="checkbox" name={name} value={value} checked={checked} disabled={readOnly} />
                  <span className="btn-checkbox__btn">{title}</span>
                </label>
              </div>
            );
          }
        )
      }
    </div>
  );
}

export default SpecializationsCheckbox;
