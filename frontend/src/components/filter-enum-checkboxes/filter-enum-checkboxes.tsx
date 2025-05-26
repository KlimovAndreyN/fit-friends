import { JSX, useState } from 'react';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { Option } from '../../types/types';

const DEFAULT_SHOW_COUNT = 5;

type FilterEnumCheckboxesProps<T> = {
  caption: string;
  name: string;
  items?: T[];
  options: Option[];
  isOptionTitleLowerCase?: boolean;
  isShowAllButton?: boolean;
  className: string;
  onChange: (specialization: T) => void;
}

function FilterEnumCheckboxes<T>(props: FilterEnumCheckboxesProps<T>): JSX.Element {
  //! порядок элементов важен? сейчас отличается с маркапом...

  const { caption, name, items, options, isOptionTitleLowerCase, isShowAllButton = false, className, onChange } = props;
  const isOptionHaveMore = (options.length > DEFAULT_SHOW_COUNT);
  const [isCurrentShowAllButton, setCurrentIsShowAllButton] = useState(isShowAllButton && isOptionHaveMore);
  const showOptionCount = (isCurrentShowAllButton && isOptionHaveMore) ? DEFAULT_SHOW_COUNT : options.length;
  const currentOptions = options.slice(0, showOptionCount);

  const handleShowAllButton = () => {
    setCurrentIsShowAllButton(false);
  };

  return (
    <div className={`${className}__block ${className}__block--${name}`}>
      <h4 className={`${className}__block-title`}>{caption}</h4>
      <ul className={`${className}__check-list`}>
        {
          currentOptions.map(
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
                    spanText={(isOptionTitleLowerCase) ? title.toLocaleLowerCase() : title}
                    value={checked}
                    valueText={value}
                    onChange={handleCustomCheckboxChange}
                  />
                </li>
              );
            }
          )
        }
      </ul>
      {
        isCurrentShowAllButton &&
        <button className={`btn-show-more ${className}__btn-show`} type="button" onClick={handleShowAllButton}>
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </button>
      }
    </div>
  );
}

export default FilterEnumCheckboxes;
