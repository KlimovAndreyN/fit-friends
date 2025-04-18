import { Specialization } from '@backend/shared/core';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

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

              const handleCustomCheckboxChange = () => {
                onChange(specialization);
              };

              return (
                <li className="gym-catalog-form__check-list-item" key={value}>
                  <CustomCheckbox
                    name='type'
                    spanText={title.toLocaleLowerCase()}
                    value={checked}
                    onChange={handleCustomCheckboxChange}
                  />
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
