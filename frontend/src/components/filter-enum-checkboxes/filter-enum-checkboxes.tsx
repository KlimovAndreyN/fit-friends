import { JSX } from 'react';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { Option } from '../../types/types';

type FilterEnumCheckboxesProps<T> = {
  caption: string;
  name: string;
  items?: T[];
  options: Option[];
  className: string;
  onChange: (specialization: T) => void;
}

function FilterEnumCheckboxes<T>({ caption, name, items, options, className, onChange }: FilterEnumCheckboxesProps<T>): JSX.Element {
  //! порядок элементов важен? сейчас отличается с маркапом...

  return (
    <div className={`${className}__block ${className}__block--type`}>
      <h4 className={`${className}__block-title`}>{caption}</h4>
      <ul className={`${className}__check-list`}>
        {
          options.map(
            ({ value, title }) => {
              const item = value as T;
              const checked = items?.includes(item);

              const handleCustomCheckboxChange = () => {
                onChange(item);
              };

              return (
                <li className={`${className}__check-list-item`} key={value}>
                  <CustomCheckbox
                    name={name}
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
