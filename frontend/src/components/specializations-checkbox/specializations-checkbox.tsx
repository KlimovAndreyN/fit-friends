import classNames from 'classnames';

import { DefaultUser, SPECIALISATIONS } from '../../const';

type SpecializationsCheckboxProps = {
  divExtraClassName: string;
  name: string;
}

function SpecializationsCheckbox({ divExtraClassName, name }: SpecializationsCheckboxProps): JSX.Element {
  const className = classNames('specialization-checkbox', divExtraClassName);

  return (
    <div className={className}>
      {
        SPECIALISATIONS.map(
          ({ value, title }) => {
            const checked = DefaultUser.SPECIALISATIONS.includes(value);

            return (
              <div className="btn-checkbox" key={value}>
                <label>
                  <input className="visually-hidden" type="checkbox" name={name} value={value} defaultChecked={checked} />
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
