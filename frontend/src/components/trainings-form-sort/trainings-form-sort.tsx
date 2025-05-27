import { JSX, FormEvent } from 'react';

import { TrainingSortType } from '@backend/shared/core';
import { convertEnumToArray } from '@backend/shared/helpers';

const SortTypeTitle: { [key in TrainingSortType]: string } = {
  [TrainingSortType.LowPrice]: 'Дешевле',
  [TrainingSortType.HighPrice]: 'Дороже',
  [TrainingSortType.ForFree]: 'Бесплатные'
} as const;

type TrainingsFormSortProps = {
  sortType?: TrainingSortType;
  className: string;
  onChange: (sort: TrainingSortType | undefined) => void;
}

function TrainingsFormSort({ sortType, className, onChange }: TrainingsFormSortProps): JSX.Element {
  //! попробовать сделать дженериком с UsersCatalogFormSort

  return (
    <div className={`${className}__block ${className}__block--sort`}>
      <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
      <div className={`btn-radio-sort ${className}__radio`}>
        {
          convertEnumToArray(TrainingSortType).map(
            (sort) => {
              const handleLabelClick = (event: FormEvent) => {
                event.preventDefault();

                if (sort !== sortType) {
                  onChange(sort);
                } else {
                  onChange(undefined);
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
