import classNames from 'classnames';

import { SPECIALISATIONS } from '../../const';

type SpecializationsCheckboxProps = {
  name: string;
  values: string[];
  divExtraClassName: string;
  readonly?: boolean;
  fromPersonalAccount?: boolean;
}

function SpecializationsCheckbox({ name, values, divExtraClassName, readonly, fromPersonalAccount }: SpecializationsCheckboxProps): JSX.Element {
  const classNamePostfix = (fromPersonalAccount) ? 'specialization' : 'specializations';
  const className = classNames('specialization-checkbox', `${divExtraClassName}__${classNamePostfix}`);

  return (
    <div className={className}>
      {
        SPECIALISATIONS.map(
          ({ value, title }) => {
            const checked = values.includes(value);

            return (
              <div className="btn-checkbox" key={value}>
                <label>
                  <input className="visually-hidden" type="checkbox" name={name} value={value} defaultChecked={checked} disabled={readonly} />
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
