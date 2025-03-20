import classNames from 'classnames';

import { SORTED_SPECIALISATIONS, SpecialisationOption } from '../../const';

type SpecializationsCheckboxProps = {
  divExtraClassName: string;
  name: string;
}

function SpecializationsCheckbox({ divExtraClassName, name }: SpecializationsCheckboxProps): JSX.Element {
  const className = classNames('specialization-checkbox', divExtraClassName);

  return (
    <div className={className}>
      {
        SORTED_SPECIALISATIONS.map(
          (specialisation) => {
            const { title, defaultChecked } = SpecialisationOption[specialisation];

            return (
              <div className="btn-checkbox" key={specialisation}>
                <label>
                  <input className="visually-hidden" type="checkbox" name={name} value={specialisation} defaultChecked={defaultChecked} />
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
