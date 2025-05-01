import { FormEvent } from 'react';

import { SortType } from '@backend/shared/core';
import { convertEnumToArray } from '@backend/shared/helpers';

const SortTypeTitle: { [key in SortType]: string } = {
  [SortType.LowPrice]: 'Дешевле',
  [SortType.HighPrice]: 'Дороже',
  [SortType.ForFree]: 'Бесплатные'
} as const;

type TrainingsFormSortProps = {
  sortType?: SortType;
  className: string;
  onChange: (sort: SortType) => void;
}

function TrainingsFormSort({ sortType, className, onChange }: TrainingsFormSortProps): JSX.Element {
  return (
    <div className={`${className}__block ${className}__block--sort`}>
      <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
      <div className={`btn-radio-sort ${className}__radio`}>
        {
          convertEnumToArray(SortType).map(
            (sort) => {
              const handleLabelClick = (event: FormEvent) => {
                event.preventDefault();

                if (sort !== sortType) {
                  onChange(sort);
                }
              };

              return (
                <label key={sort} onClick={handleLabelClick}>
                  <input type="radio" name="sort" checked={sort === sortType} readOnly />
                  <span className="btn-radio-sort__label">{SortTypeTitle[sort]}</span>
                </label>
              );
            }
          )
        }
      </div>
    </div>
  );
}

export default TrainingsFormSort;
