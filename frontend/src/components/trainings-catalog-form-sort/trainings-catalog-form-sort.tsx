import { FormEvent } from 'react';

import { SortType } from '@backend/shared/core';
import { enumToArray } from '@backend/shared/helpers';

const SortTypeTitle: { [key in SortType]: string } = {
  [SortType.LowPrice]: 'Дешевле',
  [SortType.HighPrice]: 'Дороже',
  [SortType.ForFree]: 'Бесплатные'
} as const;

type TrainingsCatalogFormSortProps = {
  sortType?: SortType;
  onChange: (sort: SortType) => void;
}

function TrainingsCatalogFormSort({ sortType, onChange }: TrainingsCatalogFormSortProps): JSX.Element {
  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        {
          enumToArray(SortType).map(
            (sort) => {
              const handleLabelClick = (event: FormEvent<HTMLLabelElement>) => {
                event.preventDefault();

                onChange(sort);
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

export default TrainingsCatalogFormSort;
