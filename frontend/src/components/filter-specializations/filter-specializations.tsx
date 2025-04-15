import { FormEvent } from 'react';

import { Specialization } from '@backend/shared/core';

import { SPECIALISATIONS } from '../../const';

type FilterSpecializationsProps = {
  specializations: Set<Specialization>;
  onChange: (specialization: Specialization) => void;
}

function FilterSpecializations({ specializations, onChange }: FilterSpecializationsProps): JSX.Element {
  //! порядок элементов важен? сейчас отличается с маркапом...

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <ul className="gym-catalog-form__check-list">
        {
          SPECIALISATIONS.map(
            ({ value, title }) => {
              const specialization = value as Specialization;
              const checked = specializations.has(specialization);

              return (
                <li className="gym-catalog-form__check-list-item" key={value}>
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label onClick={
                      (event: FormEvent<HTMLLabelElement>) => {
                        event.preventDefault();

                        onChange(specialization);
                      }
                    }
                    >
                      <input type="checkbox" checked={checked} name="type" readOnly />
                      <span className="custom-toggle__icon" >
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{title.toLocaleLowerCase()}</span>
                    </label>
                  </div>
                </li>
              );
            }
          )
        }
      </ul>
    </div>
  );
}

export default FilterSpecializations;
