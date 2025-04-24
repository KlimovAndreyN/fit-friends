import { Specialization } from '@backend/shared/core';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { SPECIALISATIONS } from '../../const';

type FilterEnumCheckboxesProps = {
  caption: string;
  specializations: Set<Specialization>;
  className: string;
  onChange: (specialization: Specialization) => void;
}

function FilterEnumCheckboxes({ caption, specializations, className, onChange }: FilterEnumCheckboxesProps): JSX.Element {
  //! порядок элементов важен? сейчас отличается с маркапом...

  return (
    <div className={`${className}__block ${className}__block--type`}>
      <h4 className={`${className}__block-title`}>{caption}</h4>
      <ul className={`${className}__check-list`}>
        {
          SPECIALISATIONS.map(
            ({ value, title }) => {
              const specialization = value as Specialization;
              const checked = specializations.has(specialization);

              const handleCustomCheckboxChange = () => {
                onChange(specialization);
              };

              return (
                <li className={`${className}__check-list-item`} key={value}>
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

export default FilterEnumCheckboxes;
